---
layout: static
title: XMPP
---
Decentralized communication is more important than ever, and while we still
love our IRC-channel we decided that it would be awesome to add another
XMPP-server to the Internet so even more people can eventually stop relying on
horrible things like ICQ. This page contains information about it.

Registration
----
**Please be aware that the REGISTRATION IS CLOSED FOR THE MOMENT (November
16th, 2016). It will be reopened in the foreseeable future, until the wave of
spammy registrations is over.**

Registration is free (free as in beer as well as free as in libre - only free
software is used to provide this service) and can be done directly from within
your prefered client or via webinterface which you can reach
[here](https://slothkrew.com:5281/register_web). If you, for some reason, can't register
with: Shoot us a mail at **sloths@slothkrew.com** and we will create it for
you.

Server information
----
* Address / domain: **slothkrew.com**
* Ports: **5222** for **c2s** and **5269** for **s2s**
* Encryption is **mandatory**

Rules
----
We could potentially write a lengthy article about what you are allowed to do
and what you are not allowed to, but in the end it boils down to three basic
rules you need to follow in order to have a pleasant stay:

* Don't be an ass-twat
* Don't use this service to abuse others
* Seriously: Don't be an ass-twat

We know that it's easy to be relatively hard to catch on the Internet. And yes,
we know that we are putting a certain amount of trust in mankind. (Sloths are
their biggest enemy.)

Even though we hope that we will never reach that point: We reserve the right
to bar people out of this server if they act ass-twaty. 

Security
----
First of all: We are not perfect. As a matter of fact we are sloths, that means
we are probably busy hanging around on trees. And while we therefore can't
guarantee for the safety of your data we try to make your stay as comfortable
and safe as possible.

We did not do any crazy magic to harden the server, we run a pretty much
vanilla installation of Debian stable (which is Jessie as of this writing)
without stuff like grsecurity or a super-fancy-epic-hardened kernel. We just try
to make sure that software stays up-to-date and access to the machine is
properly restricted.

Prosody is installed directly from the developer's package repository to be
able to use stronger encryption ciphers which aren't available in the standard packages.

We enforce encryption for both c2s- and s2s-connections. Yes, we are aware that
there is the potential of servers not being able to communicate with ours but
it doesn't outweigh the definite security gain everybody gets out of it.

The SHA-256-fingerprint of the certificate is:

>3A:36:A1:94:E1:46:70:D0:23:0A:03:8E:2D:C0:D5:3E:F6:A6:8A:EC:41:C6:27:6F:40:58:57:69:7D:87:D9:D3


In addition to mandatory encryption we switched away from Prosody's default
settings but instead implemented the recommendations of the
[BetterCrypto](https://bettercrypto.org)-project in order to further increase
connection security, including some more tweaks for even better results. Feel
free to run our server through the test at [xmpp.net](https://xmpp.net/) if you
enjoy looking at lots of green.

Prosody's default is to store passwords in plaintext, which is one of the
biggest no-no's ever. We don't want to land
[here](http://plaintextoffenders.com/) one day. Or your passwords to land on
some underground forum. Because of that we use the storage-backend
'internal_hashed'.

We respect your privacy as much as possible, logging only what's necessary:

* XMPP contact list (referred to as 'roster')
* Error-messages of classification 'error' or higher.

That's it. Nothing more. When you talk with whom is none of our concern.

If, for some reason, we need more information (perfect example: Debugging
purposes) and thus have to increase the loglevel temporarily, we will inform
you before we do so.

We don't just highly recommend that you make use of
[OTR](https://en.wikipedia.org/wiki/Off-the-Record_Messaging) which provides
you with encryption, authentication, deniability and PFS - we enforce it
server-side. Plaintext-messages won't happen on our server. That means that
offline-messages are impossible, as well as group-chats. Luckily it is already
part of many popular clients (Such as Adium for OSX or mcabber for BSD/Linux),
and in case it's not there is most likely a easily configurable plugin out
there.

In terms of the danger of data loss: There are daily backups done by our
server-provider (He basically takes a dump of our virtual machine which is
fully encrypted. So there won't be any violation of your privacy.) and hourly
encrypted backups to a remote location.

Plans for the future
----
There are some things that we potentially like to improve in order to improve
your stay here. This includes but is not limited to:

* DNSSEC for slothkrew.com (That would require running our own nameservers and dealing with Godaddy's stupid way of handling zone transfers - or DNS in general.)
* Offer connectivity via Tor, that means hosting XMPP as hidden service. This is currently only brainstorming.

We can't give you an ETA on this tough. We are sloths after all.

Questions?
----
If there is something on your mind or you need help something feel free to
contact us. Via IRC (Given the amount of mentions it gets here on the page it
should be easy to figure out where we hang around.), shoot us a mail to <a
href="mailto:jabberoperators@slothkrew.com">jabberoperators@slothkrew.com</a>
or XMPP.
