---
layout: post
title:  "BKP 2015: Schoolbus Writeup"
date:   2015-03-03
categories: ctfwriteups
author: jsrn, sjums
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


# Health Street

The Healt Street challenge description mentioned "During my time at KGB [...]" which is the first lead - KGB is a compression tool known for good compression rates. 

After running the `file` command agains the downloaded file it told us the downloaded file was an ext4 filesystem.

I got my hands on `extundelete` and quickly recovered the files with `extundelete --restore-all secretArchive.6303dd5dbddb15ca16777215c4307d02167772151f77f4`. It contained a lot of text files, which were a transcription of a phone conversation. Nothing of real interest except for a hidden file called `.secret31337` which appeared to be a KGB Archive.

By adding .kgb to the filename it can be opened with KGB Archiver and we can extract a file called `.secret`.

`.secret` contained the flag.

Flag: `Komitet_gosudarstvennoy_bezopasnosti`


# Brigham Circle

The requirements for this challenge was to get past a regex which looked something like this `/^[a-zA-Z0-9]+$/` and at the same time have two dashes `--` in the entered name.

Problem with the regex is that it check for a single line, so by ending your line with a null terminator (%00), but not really ending it, you could beat this challenge.

Solution: `?name=abc%00--`


# Museum of Fine Arts

This challenge gave you a list of three random numbers and expected the fourth random number to give you the flag. 

A look at the source code gave us that the function used for making random numbers is mt_rand() which is not safe [if you know the first random number generated](http://www.openwall.com/php_mt_seed/). 

A look at the README file and we soon started crunching numbers to find the seed using php_mt_seed. The command looked like this; `php_mt_seed 123 123 0 16777215  456 456 0 16777215  789 789 0 16777215` where 123, 456 and 789 were the random numbers we were provided in the challenge. 0 and 16777215 are the min and max values used in the mt_rand call in the challenge.

When php_mt_seed found the seed for the random sequence after a couple of minutes you could run `php -r 'mt_srand(987654321); for ($i = 0; $i < 4; $i++) { echo mt_rand(0, 0xffffff), " "; } echo "\n";'` which then revealed the last random number and we got the flag!


# Longwood Medical

This challenge required you to enter both a name and a password. Both fields had to return TRUE when sent as parameters to the `ctype_alnum` function.

If that happened to turn out okay a variable would be build with a SQL query looking like this - `select * from user where login = '.login.' and password = '.password.';'`

That query then got executed agains an SQLite database, and if the result was not FALSE and not NULL the flag would be returned.

The solution was simple. They didn't wrap the user's input in qoutes, so providing `login` as the name and `password` as the password (same values as the column names) returned something and the flag got printed to the screen.
