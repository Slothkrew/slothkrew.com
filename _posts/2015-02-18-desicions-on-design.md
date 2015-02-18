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
serverside-encryption out there on the Internet!  To measure the availability
of encryption I run the test on [xmpp.net](https://xmpp.net) on several of the
bigger (mostly) European XMPP-servers. While this is of course not
scientifically valid it gives a overview over the general situation.

* draugr.de (c2s: **Yes**, s2s: **Yes**, grade: A-) 
* dukgo.com (c2s: **Yes**, s2s: **Yes**, grade: A) 
* is-a-furry.org (c2s: **Yes**, s2s: **Yes**, grade: A) 
* jabber.ccc.de (c2s: **Yes**, s2s: **Yes**, grade: A) 
* jabber.org (c2s: **Yes**, s2s: **Yes**, grade: A) 
* jabber.no (c2s: **Yes**, s2s: **Yes**, grade: A-) 
* jabber.se (c2s: **Yes**, s2s: **Yes**, grade: B)
* is-the-shit.com (c2s: **Yes**, s2s: **Yes**, grade: A)
* mail.de (c2s: **Yes**, s2s: **Yes**, grade: A)
* adium.ine (c2s: **Yes**, s2s: **Yes**, grade: A-)
* hot-chilli.eu (c2s: **Yes**, s2s: **Yes**, grade: A)
* jabber-hosting.de (c2s: **Yes**, s2s: **Yes**, grade: A)
* jabber.cz (c2s: **Yes**, s2s: **Yes**, grade: B)
* linuxlovers.at (c2s: **Yes**, s2s: **Yes**, grade: A-)
* neko.im (c2s: **Yes**, s2s: **Yes**, grade: A)

Overall not the worst results, and glancing over xmpp.net's
[list](https://xmpp.net/directory.php) of public XMPP servers the
crypto-picture does not look that horrible. Yes, some use ugly things like RC4
(If any of the administrators using RC4 reads this: You are going to stop doing
so. Right now.). Yes, very few enforce encryption. But the general support
seems there. So our server will be able to communicate with much of the others
out there, that means enforcing s2s-encryption will mostly not cause any
issues.

If issues do actually pop up there are two possibilities. There is a module for
Prosody that allows administrators to disable encryption on a per-host-base. We
could do that. But most likely, as harsh as it may sound, we would not do that.
But rather advise talking with the other server's administrator. There is
excellent documentation for properly setting up connection encryption out
there. StartSSL and CaCert make it incredibly easy to get certificates. So what
excuse is there really for not doing it?

We decided to go with a simple yet strict rule: TLS 1.2. That's it. We won't
speak anything below that. While it's perfectly arguable that TLS 1.1 has not
been broken either we don't see a point in supporting an older protocolfor no
benefit. We have 2015, our processors can handle the additional workload.

For server-software there is definitely no problem with that. Prosody, which we
use, speaks TLS 1.2. One of my private servers runs ejabberd, which speaks TLS
1.2. Openfire supports TLS 1.2 (for JDK-versions > 1.7). Cisco Jabber, which
sits in a lot of enterprises (Don't chat while you are at work folks!),
supports TLS 1.2. But while we are set here I somehow suspect problems on the
client-side of things, given the desperate state some of the more popular ones
are or have been. So, how is the state of support for TLS 1.2 amongst the more
popular clients?

* Pidgin supports it since around the end of 2013 (see [here](https://developer.pidgin.im/ticket/15744), I can't seem to find an actual release note)and actually prefers it since October 2014 (see [here](https://developer.pidgin.im/wiki/ChangeLog))
* Adium supports it since at least October 2013 (see [here](https://trac.adium.im/wiki/AdiumVersionHistory))
* Miranda supports it (see [here](http://miranda-im.de/mediawiki/index.php?title=SSL)) but I was not able to find out since which version
* Gajim supports it since around November 2013 (see [here](https://python-nbxmpp.gajim.org/ticket/8))
* Psi seems to support it, but I could not find out any specifics except some problems related to TLS 1.2 from back in January 2014
* mcabber seems to support it, but the situation is the same as with Psi
* Empathy .. no damn idea. The documentation is incredibly bad. The only thing that includes hints that TLS 1.2 is supported is a [blog-entry](https://blog.thijsalkema.de/me/blog//blog/2013/09/02/the-state-of-tls-on-xmpp-3/)

So of all three of the potentially problematic settings I suspect client
support for TLS 1.2 to be the only thing that could actually come up. And the
only way of mitigating this would probably be allowing TLS 1.1.

There is a pretty neat description of the differences between TLS 1.1 and TLS
1.2 in a [blog entry from
yaSSL](http://www.yassl.com/yaSSL/Blog/Entries/2010/10/7_Differences_between_SSL_and_TLS_Protocol_Versions.html).
The only thing that is really ugly is the potential applicability of
CVE-2014-3566 (The common name for this is 'POODLE'. I hate those names.) for
certain TLS-implementations.

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

* Miranda supports it since December 2010 (see [here](https://code.google.com/p/miranda/source/list?num=25&start=13218))
* Gajim supports it since February 2010 (see [here](https://trac.gajim.org/changeset/2593c6a02d88))
* Psi supports it since February 2013 (see [here](https://github.com/tfar/psi-soc2010/commits/sasl-scram) and [here](https://github.com/tfar/iris-gsoc2010/commits/sasl-scram))
* mcabber **apparently** supports it - but it was impossible to find proof or a commitlog
* Empathy **apparently** supports it - but it was again impossible to find proof, all I could find was a [mention](https://support.process-one.net/browse/EJAB-1196) in ejabberd's bugtracker and a [logfile](http://bokomoko.de/~rd/telepathy/All-05-10-12_23-42-27.log)
* ChatSecure supports it since March 2014 (see [here](https://github.com/robbiehanson/XMPPFramework/commit/6a6c326314c46e2f72b847204142e7fe8af74079))

So generally speaking it's widely supported with the more popular clients

What are the downsides of switching to hashed passwords? The aforementioned
article goes into detail about that:

* Once hashed, there is no way to go back to plain storage without
resetting all users' passwords.

I see no point in going back to plaintext storage. After all, there are only
reasons to switch away **to** hashed passwords, not back **from** hashed
passwords. But in case we, for some reason, would want to go back, then that's
an inconvenience we would have to live with.

* There is currently no standard way to migrate hashed passwords
between different XMPP server software. This is being worked on.

Pretty much the same as above applies. Prosody successfully fills our needs,
thus there is no need to switch to something else. But, again as above, if we
actually wanted to switch then we would have to live with that.

* For clients that do not support the new SCRAM-SHA-1 mechanism
(most at the time of writing), authentication will be slower.

I looked at the state of SCRAM-SHA-1-support above, and the situation has
apparently improved drastically over the last years. So this problem will
mostly not be one.

* DIGEST-MD5 is not compatible with hashed password storage, and
will not work, and older clients might complain about that.

So be it. The term 'older clients' here means 'clients that have not been
updated in at least three years'. And that brings a whole set of problems by
itself.

* Clients that do not yet support SCRAM-SHA-1 will only be able to use the
PLAIN mechanism to authenticate, which is insecure if used without TLS (and
completely trusted certificates).

And since there is nothing PLAIN left those clients will simply fail. But
again, this would only hit really old clients who should not be used anymore
anyway.

I am not an expert on the subject of cryptography and I don't have overwhelming
experience with running an XMPP-server for more than myself and some friends so
only time will show if the things I stated are really as true as I - and other
people - say they are. If you experience any problems with our server please
let us know. We like to learn.
