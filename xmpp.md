---
layout: static
title: XMPP
---
Decentralized communication is awesome, and while we still love our IRC-channel
we decided that it would be awesome to add another XMPP-server to the Internet
so even more people can eventually stop relying on horrible things like ICQ.

Registration
----
Registration is free (free as in beer as well as free as in libre - only free
software is used to provide this service) and can be done directly from within
your prefered client. If you, for some reason, can't register with your
client-software: Shoot us a mail at **sloths@slothkrew.com** and we will create
it for you.

Server information
----

Rules
----
We could potentially write a lengthy article about what you are allowed to do and what you are not allowed to, but in the end it boils down to three basic rules you need to follow in order to have a pleasant stay:

* Don't be an ass-twat
* Don't use this service to abuse others
* Seriously: Don't be an ass-twat

We know that it's easy to be relatively hard to catch on the Internet. The
reason we maintain a Tor-relay is that we believe in the good in people (Yeah,
I know. Sloths tend to be quite optimistic.)

Security
----
First of all: We are not perfect. As a matter of fact we are sloths, that means
we are probably busy hanging around on trees. And while we therefore can't
guarantee for the safety of your data we try to make your stay as comfortable
and safe as possible.

We have been thinking about forcing encryption for both c2s- and
s2s-connections, but in the end decided to only force encryption for
c2s-connections. The main reason for that being the sad state of encryption
with some of the bigger messenger services out there. We would lock a lot of
people out

We highly recommend that you make use of
[OTR](https://en.wikipedia.org/wiki/Off-the-Record_Messaging) which provides
you with encryption, authentication, deniability and PFS. Luckily it is already
part of many popular clients (Such as Adium for OSX or mcabber for BSD/Linux),
and in case it's not there is most likely a easily configurable plugin out
there.

There are daily backups done by our server-provider (He basically takes a dump
of our virtual machine which is fully encrypted. So there won't be any
violation of your privacy.) and we are in the process of implementing encrypted
backups to at least one remote destination.

