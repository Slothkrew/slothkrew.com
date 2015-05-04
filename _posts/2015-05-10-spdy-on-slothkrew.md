---
layout: post
title:  "SPDY on slothkrew.com"
date:   2015-05-10
categories: misc
author: dot|not
---
As of today, <a href="https://slothkrew.com">slothkrew.com</a> is reachable not only via HTTP(s), but also via SPDY.

<h3>What</h3>

SPDY is a networking protocol ((mainly) developed by the master of all botnets,
Google) for efficiently (by compressing and multiplexing) and securely (by
strongly using opportunistic cryptography without enforcing it) transporting
web content. It's not, as widely believed, a replacement for HTTP. Instead it
works by modifying how HTTP-requests are sent across the wire.

<h3>Why</h3>
Out of curiosity I did some research on HTTP/2, trying to find out how the
support for it is growing since it's apparently about to become an official RFC
this very year. It turns out that nginx does not yet support HTTP/2, but is
planning to do so <a
href="http://nginx.com/blog/how-nginx-plans-to-support-http2/">during the
course of this year</a>. In the mean time, the Internet told me, playing around
with SPDY seems to be the way to go.I stumbled upon some other interesting
articles about the topic, such as a <a
href="https://developers.google.com/speed/articles/spdy-for-mobile">study</a>
by Google (Yes, I know. There is a potential for bias given that the
researchers work for Google.) that stated that there is a near 25% increase in
speed for mobile users when SPDY is used. Some of the sloths have already
enabled SPDY on their servers, so more or less naturally I

So in the end it more or less boils down to: Because it's fun. And easy to do.
And now I can feel good for the rest of the day and can legitimately ignore all
the stuff I should actually fix. Living the BOFH-life.

<h3>How</h3>
It's pretty damn simple to enable SPDY for nginx, the project's <a
href="http://nginx.org/en/docs/http/ngx_http_spdy_module.html">documentation
page</a> contains all the necessary information. You should make sure to have a
semi-recent version (The current Debian Stable, Jessie, is recent enough.) though. If that's the case all you need to do is edit your virtual host/s accordingly:

{ % highlight bash % }
-- SNIP --
server {
        listen 443 spdy;
        listen [::]:443 spdy;
        server_name slothkrew.com;
-- SNIP --
{ % endhighlight % }

Reload nginx' configuration and you are good to go. Dead simple!

Apache doesn't seem to have the built-in capabilities to handle SPDY, there is
at least one <a href="https://github.com/eousphoros/mod-spdy">third party
module</a> for that, which unfortunately isn't building properly at the moment.
In addition to that you apparently need to <a
href="https://community.qualys.com/thread/14145">default interpreter</a> for
PHP. So nginx would, at the moment, be a better choice if you want reliable
SPDY-support.

Note on testing our SPDY-support: <a
href="https://spdycheck.org">spdycheck.org</a> (which seems to be the only site
providing SPDY-checks) uses an older protocol to negotiate which application
level protocol is running over TLS. Newer implementations of SPDY, such as the
one we are using for nginx, rely on ALPN (which is the de-facto standard now)
which the site does not support as of today. So you will get a false-negative
for our site. If you use Firefox you can use the <a
href="https://github.com/chengsun/moz-spdy-indicator">SPDY
Indicator</a>-plugin, if you use Chrome you can check your current
SPDY-sessions via <i>about:net-internals</i>, look out for the keyword 'spdy'.
