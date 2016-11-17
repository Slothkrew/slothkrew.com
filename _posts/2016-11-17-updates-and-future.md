---
layout: post
title:  "They see us movin'. They hatin'."
date:   2016-11-17
categories: admin
author: dot|not
---
Running a simple, solid, stable service has the 'downside' that nothing much
noteworthy ever happens, so our blog section is relatively quiet. But for once,
there's something we'd like to give you a heads-up about: We're moving sometime
(tm) soon (tm).

We've been with [Vultr](https://vultr.com) ever since we started, and while they
have been great so far, both in terms of speed and stability, there are some
things that made us consider moving, already a while ago.

We're paying around 25$ every month four our server, and we don't even fully
utilize the resources we have at our disposal. At the same time, we could
easily get the same hardware, in physical form, for half of the money. While we
are fine with paying what we pay, it makes sense to cut down the monthly costs,
since we're a bunch of hobbyists, paying this out of our own pocket.
Additionally, switching to dedicated hardware would prevent a whole class of
attacks from being effective, effectively making us the only potential rouge
operator.

Besides that there are some software and design choices we need to re-evaluate
- nothing related to our choice of XMPP-server, but rather the way our
  monitoring and backups work, in order to make the whole thing a bit more
resilient.

When we started this service, StartSSL was the only (really) viable option for
free TLS-certificates, so we went down that route. That was drastically changed
by the appearance of [Let's Encrypt](https://letsencrypt.org/), and since our
certificate will expire at the beginning of 2017 we'll use the upcoming move to
switch certificate authority.

We can't exactly tell you when the move is going to happen, we're anticipating
it to be somewhere around December 8th - the point is though: It should barely
be noticeable, nothing will change for you except the certificate. We'll post
an update once the move is finished.

Generally speaking, and last but not least, feel free to talk to us. We're home
to several dozen users by now, and while we're happy that they are happily,
quietly chatting away - we'd like to have some feedback. So if there's
something you want to see or want to see done better .. hit us up, fam.
