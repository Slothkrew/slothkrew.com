---
layout: post
title:  "Decisions on design"
date:   2015-02-18 22:43:23
categories: misc
author: dot|not
---
While writing documentation for and setting up our XMPP-server I noticed that
our configurations was quite restrictive compared to other people's servers
that are out there in the wild. The specific points that came to my mind as
somewhat unusual are:

* Forced encryption, for c2s as well as s2s (That's admitedly the least unusual)
* Forced TLS 1.2, nothing 'weaker'
* Forced authentication via SCRAM-SHA1 due to hashed-passwords

Yes, we are aware that we are locking out some people by being that
restrictive. But how many people / clients / operating systems we are actually
locking out? Definitely Windows XP, but we don't think that we cater towards an
audience that relies on Windows XP as their daily driver. Let's take a look at
the client-support for our settings as well as the state of
serverside-encryption out there on the Internet!



One of the uglier default settings Prosody has is the default storage for
passwords - in plain text on the hard disk. Ehrm. No. Plain (See what I did
there?) and simple 'No.'. We want at least hashed passwords, and luckily that's
easily doable with Prosody. The
[documentation](http://prosody.im/doc/plain_or_hashed) for the module that
provides support for hashed passwords goes into quite a bit of length in order
to .. it feels like discouraging you from hashing your passwords, but I assume
at the time of the writing it was a problematic topic due to the lack of
client-support.


Let's take a quick look at the state of support for SCRAM-SHA1 in popular clients:

* Pidgin supports it since Februar 2010 (see [here](https://developer.pidgin.im/wiki/FullChangeLog))
* Adium supports it since March 2010 (see [here](https://pidgin.im/pipermail/commits/2010-March/016759.html))
* Miranda supports it since December 2010 (see [here](https://code.google.com/p/miranda/source/list?num=25&start=13218))
* Gajim supports it since February 2010 (see [here](https://trac.gajim.org/changeset/2593c6a02d88))
* Psi supports it since February 2013 (see [here](https://github.com/tfar/psi-soc2010/commits/sasl-scram) and [here](https://github.com/tfar/iris-gsoc2010/commits/sasl-scram))
* mcabber **apparently** supports it - but it was impossible to find proof or a commitlog
* Empathy **apparently** supports it - but it was again impossible to find proof, all I could find was a [mention](https://support.process-one.net/browse/EJAB-1196) in ejabberd's bugtracker and a [logfile](http://bokomoko.de/~rd/telepathy/All-05-10-12_23-42-27.log)
* ChatSecure supports it since March 2014 (see [here](https://github.com/robbiehanson/XMPPFramework/commit/6a6c326314c46e2f72b847204142e7fe8af74079))

So generally speaking it's widely supported with the more popular clients

What are the downsides of switching to hashed passwords? The aforementioned
article goes into detail about that: <blockquote> Once hashed, there is no way
to go back to plain storage without resetting all users'
passwords.</blockquote>

I see no point in going back to plaintext storage. After all, there are only
reasons to switch away **to** hashed passwords, not back **from** hashed
passwords. But in case we, for some reason, would want to go back, then that's
an inconvenience we would have to live with.

<blockquote> There is currently no standard way to migrate hashed passwords
between different XMPP server software. This is being worked on.</blockquote>

Pretty much the same as above applies. Prosody successfully fills our needs,
thus there is no need to switch to something else. But, again as above, if we
actually wanted to switch then we would have to live with that.

<blockquote> For clients that do not support the new SCRAM-SHA-1 mechanism
(most at the time of writing), authentication will be slower.</blockquote>

I looked at the state of SCRAM-SHA-1-support above, and the situation has
apparently improved drastically over the last years. So this problem will
mostly not be one.

<blockquote> DIGEST-MD5 is not compatible with hashed password storage, and
will not work, and older clients might complain about that.</blockquote>

So be it. The term 'older clients' here means 'clients that have not been
updated in at least three years'. And that brings a whole set of problems by
itself.

<blockquote>Clients that do not yet support SCRAM-SHA-1 will only be able to use the PLAIN mechanism to authenticate, which is insecure if used without TLS (and completely trusted certificates).</blockquote>

The PLAIN mechanism doesn't work with hashed passwords. So clients that do not support 



