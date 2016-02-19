---
layout: post
title:  "Regarding CVE-2015-7547"
date:   2016-02-19
categories: admin
author: dot|not
---
Most of you will probably have heard about
[CVE-2015-7547](https://googleonlinesecurity.blogspot.co.at/2016/02/cve-2015-7547-glibc-getaddrinfo-stack.html).
For those who haven't the TL;DR-is: Potential for RCE via DNS-queries. Since we
are running a current version of Debian all the services (HTTP and XMPP) here
were affected by it. Patches have been applied in a timely manner, all
potentially vulnerable services have been restarted. All good again, sorry for
any inconvenience.
