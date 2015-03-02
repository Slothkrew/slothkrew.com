---
layout: post
title:  "BKP 2015: Haymarket Writeup"
date:   2015-03-01
cover: cover.jpg
categories: ctfwriteups
author: jsrn
---

 > Monty Hall wrote a script of how he was supposed to run one of his game shows for his trusty accounting computer some time ago, but hes not really sure what the punch cards mean any more. I mean, that was a while ago. Only, hes sure his key is hidden somewhere in these punch-cards, if he could figure out how to run them... : 150

The download for this challenge was a zip file containing 32 .png files. Each png file was a picture of a punch card with various holes punched. The files were numbered, and apart from the placement of the punched holes, identical.

This made it reasonably simple to write a little ruby script with the RMagick gem to go through each card and read off the punched holes.

As it turns out, the generator used to create the images for the challenge was http://www.kloth.net/services/cardpunch.php

Assuming (correctly) that the setting used was the IBM-029 encoding, we struck upon the idea to just put in the string ABCD...XYZ. Reading the punched holes from the resulting card, we can build up a map of holes to letters.

Then it's just a matter of reading through all of the cards with our alphabet map in mind, and constructing the resultant string.

{% highlight ruby %}
#!/usr/bin/env ruby

require 'RMagick'

def get_card_number(card_name)
  card_name = card_name.sub("cards/L", "")
  card_name = card_name.sub(".png", "")
  card_name.to_i
end

def read_card(card_file)
  image = Magick::Image.read(card_file).first
  x = @start_x
  y = @start_y
  cols = []
  @cols_per_card.times do
    col = ""
    y = @start_y
    @rows_per_col.times do
      colour = image.pixel_color(x,y)
      if is_punched?(colour)
        col << "1"
      else
        col << "0"
      end
      y += @row_inc
    end
    x += @col_inc

    print @sequences[col] || " "
    cols << col
  end
  cols
end

def is_punched?(pixel)
  pixel.red < 6000 && pixel.green < 6000 && pixel.blue < 6000
end

@start_y       = 20
@start_x       = 15
@row_inc       = 20
@col_inc       = 7
@cols_per_card = 80
@rows_per_col  = 12

files = Dir["cards/*"]

sorted_files = files.sort do |a, b|
  a = get_card_number(a)
  b = get_card_number(b)

  a <=> b
end

@sequences = {}

alphabet = read_card("alphabet.png")

("A".."Z").to_a.each_with_index do |letter, index|
  @sequences[alphabet[index]] = letter
end

sorted_files.each do |file|
  read_card(file)
end
{% endhighlight %}

And the output is:

 > IDENTIFICATION DIVISION  PROGRAM ID  LETS MAKE A DEAL  AUTHOR   MONTE HALPARIN  DATA DIVISION  WORKING STORAGE SECTION        DOORCHOICES         GOODDOOR        PIC           FIRSTCHOICE       PIC           OPENDOOR        PIC           CHANGEDOOR        PIC        CURRENTDATE         CURRENTYEAR     PIC                CURRENTMONTH    PIC            CURRENTDAY      PIC           DAYOFYEAR          CURRENTMONTH FILLER          PIC              YEARDAY           PIC           CURRENTTIME         CURRENTHOUR     PIC                CURRENTMINUTE   PIC            CURRENTTENS     PIC             CURRENTONES     PIC           FILLER          PIC      PROCEDURE DIVISION  DISPLAY  MH  WELCOME TO LETS MAKE A   DEAL   DISPLAY  MH  THERE ARE THREE DOORS  ONLY ONE WITH THE   KEY   ACCEPT CURRENTTIME FROM TIME  IF CURRENTONES        SET   GOODDOOR TO   ELSE    IF CURRENTONES           SET GOODDOOR TO        ELSE       SET GOODDOOR TO      END IF END IF DISPLAY  MH    YOU MAY ONLY OPEN ONE DOOR  WHICH DOOR    IF CURRENTTENS       OR CURRENTTENS        SET FIRSTCHOICE TO    IF CURRENTTENS       OR CURRENTTENS        SET FIRSTCHOICE TO    IF CURRENTTENS       OR CURRENTTENS        SET FIRSTCHOICE TO    DISPLAY    PLAYER  I PICK DOOR   FIRSTCHOICE     IF FIRSTCHOICE     GOODDOOR    DISPLAY  MH  THAT IS AN INTERESTING CHOICE OF   DOOR      IF CURRENTTENS  OR   OR CURRENTTENS           SET   OPENDOOR TO      END IF    IF CURRENTTENS     OR CURRENTTENS             SET OPENDOOR TO      END IF    IF CURRENTTENS     O  OR   CURRENTTENS           SET OPENDOOR TO      END IF    DISPLAY    MH  LET ME GIVE YOU A HINT      DISPLAY  MONTY HALL OPENS   DOOR   OPENDOOR    DISPLAY  A GOAT RUSHES OUT WITH NO KEY        DISPLAY  MH  WOULD YOU LIKE TO CHANGE YOUR D GOOR CHOICE        DISPLAY  PLAYER  YES  MY LOGIC MINOR IN COLLEGE HAS A USE    GOOR     IF CURRENTTENS     OR CURRENTTENS           SET CHANGEDOOR   TO      END IF    IF CURRENTTENS     OR CURRENTTENS             SET CHANGEDOOR TO      END IF    IF CURRENTTENS     OR   CURRENTTENS           SET CHANGEDOOR TO      END IF    DISPLAY    PLAYER  I WILL CHOOSE DOOR   CHANGEDOOR   INSTEAD   ELSE      SET CHANGEDOOR TO FIRSTCHOICE  IF CHANGEDOOR   GOODDOOR      DISPLAY  MH  CONGRASETULATIONS  YOU FOUND A KEY      DISPLAY    MH  THE KEY IS      DISPLAY  KEY   SETALEXTREBEKISASOCIALENGINEER   ELSE    DISPLAY  MONTY HALL   OPENS THE DOOR  A GOAT JUMPS OUT      DISPLAY  MH  THIS IS   THE INCORRECT DOOR      DISPLAY  THE GOAT EATS YOUR PUNCH   CARDS  START OVER    STOP RUN

It's not perfect because we didn't take into account new lines or really anything that isn't A through Z, and because we treated everything else as a space because whatever, man.

The relevant snippet of text from the output is "DISPLAY  KEY   SETALEXTREBEKISASOCIALENGINEER", and the key is "ALEXTREBEKISASOCIALENGINEER"

This looks like a BASIC program, so it might be fun to actually compile and run some time.