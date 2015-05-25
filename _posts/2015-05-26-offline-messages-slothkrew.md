---
layout: post
title:  "To offline-message or not to offline-message?"
date:   2015-05-26
categories: xmpp
author: dot|not
---
Most people are in a state of semi-coma after they get up in the morning (If
you are not: I envy you.). I am no exception to that 'rule'. I tend to not
think very straight before I have had my first cup of coffee, I also tend to
think about things that are in no way related to anything that is planned that
day. That's exactly what happened while showering this morning.

While I was carefully shampooing my hair (Read: I spent five minutes getting
showered by the water while slowly wasting all the shampoo.) I kept thinking:
'Are offline messages on the XMPP-server really a good idea?'

Normally I forget what I was thinking that early quite quickly, but that
thought stayed with me for the rest of the day. So I decided to take a closer
look. 

XMPP provides the functionality of storing messages that are sent to accounts
that are currently not online. Which is generally a cool thing because it's
quite comfortable, but it comes at a price, security-wise.

Before I dive into the potential security-implications of offline-messages
let's take a moment to remind everybody that encryption is your friend and that
you should use (authenticated!) OTR wherever possible. The use of OTR makes
every attack scenario I mention below impossible. (Admitedly, the use of OTR
makes offline messages impossible too, but .. let's forget about that for a
moment!)

The way how offline-messages are handled within the XMPP-protocol is set by the
[XEP-0013](http://xmpp.org/protocols/offline/)-draft, which is basically a RFC
in the terms of the XMPP standard foundation.

On a very high level the behaviour is similar to POP3 for e-mail:

* A message gets delivered to a user's inbox when he's not available to directly receive it
* A soon as said user is connected to the server again the user's client fetches the offline messages from the inbox
* After that is done the message is deleted from the inbox

As with most of the stuff related to XMPP-data the information is stored as XML
and looks somewhat like this:

	---- SNIP ----
	item({
	        [1] = {
	                ["name"] = "active";
	                ["attr"] = {
	                        ["xmlns"] = "http://jabber.org/protocol/chatstates";
	                };
	        };
	        [2] = {
	                [1] = "Please send the money to the account with the number 3428953. Thank you!";
	                ["attr"] = {};
	                ["name"] = "body";
	        };
	        ["name"] = "message";
	        ["attr"] = {
	                ["stamp_legacy"] = "20150519T14:28:59";
	                ["type"] = "chat";
	                ["to"] = "jsrn@slothkrew.com";
	                ["from"] = "dotnot@slothkrew.com/wrk";
	                ["id"] = "purple6fc376b5";
	                ["stamp"] = "2015-05-19T14:28:59Z";
	        };
	});
	---- SNIP ----

<br />So apparently, some of the operators of this very service are using it to
discuss slothkrew-ketamine-dealing-business. It would be a shame if the
competition got ahold of that message, it would be even worse if the
competition could alter the content of that message and change, for example,
the account number. That should be nearly impossible to do for them though,
right? Right?

Because the temporary storage for the messages that are to be delivered once
that account is online again is on the hard disk and not in the memory,
everybody with sufficient access privileges can easily alter the content of
that message.

Ideally only operators have that access. But in an ideal world we would not
have to worry about security concerns - but in this world there could be a
privilege execution, a bug in Prosody giving access to anyone or there is the
possibility of a rogue operator.

So let's say one of the operators has actually gone rouge and wants some more
profits out of the business. He alters the content of the message from

	"Please send the money to the account with the number 3428953"

<br />to something different like

	"Please send the money to the account with the number $sleepers_account"

<br /> So when jsrn logs back in he would receive a seemingly legitimate message with
completely wrong content. And I would never see my money.

What makes this even easier for an attacker is the fact that no checksums are
generated (If I haven't completely misunderstood the code I looked at.), so no
integrity checking takes place at all. That's dangerous.

And even if you look at it from a not-so-directly-shadowy-angle: All the
offline-messages are sent in bulk as soon as the user reconnects after an
absence. That's of no importance when you receive a few messages, but what if
you receive hundreds of messages? Ideally, you just get beaten up by tons of
popups and sounds. Worst, you lose potentially important conversation -
remember, once the messages are retrieved they are gone from the server.

Because of the above reasons there is, from now on, no offline-message-support
for slothkrew.com anymore. The potential security gain from this is not
**that** big. But the potential inconvenience is even smaller. As always, if
you face any problems and / or disagree with that decision, just let us know.
Nobody is perfect, and we most certainly aren't that nobody-guy.
