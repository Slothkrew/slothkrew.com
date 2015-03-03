---
layout: post
title:  "BKP 2015: Schoolbus Writeup"
date:   2015-03-03
categories: ctfwriteups
author: jsrn
---

This writeup is gonna cover a bunch of challenges from the School Bus category.

# Symphony

We had to input a value which would return true from the php function `is_numeric`, is greater than 999, but did not exceed 3 characters.

Luckily, we can write numbers with an exponent in PHP.

Answer: `9e9`

Flag: `B4SE10_IS_F0R_LOSERS`

# BU Central

The challenge description was `The flag is party`. Shockingly:

Flag: `party`

# Northeastern University

This challenge performed an unsafe `stringcmp` against the GET parameter. Read [this stackoverflow thread](http://stackoverflow.com/questions/3333353/string-comparison-using-vs-strcmp) for details.

Flag: `Still_better_than_the_d0uble_equals`

# Park Street

What is the OpenFlow table modification message type to add a new flow? : 10

We can read the openflow spec [here](http://archive.openflow.org/documents/openflow-spec-v1.1.0.pdf). (pdf)

    enum ofp_flow_mod_command {
      OFPFC_ADD, /* New flow. */
      OFPFC_MODIFY, /* Modify all matching flows. */
      OFPFC_MODIFY_STRICT, /* Modify entry strictly matching wildcards and
      priority. */
      OFPFC_DELETE, /* Delete all matching flows. */
      OFPFC_DELETE_STRICT /* Delete entry strictly matching wildcards and
      priority. */
    };

Flag: `OFPFC_ADD`
