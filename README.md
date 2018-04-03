# burger-overlay

A burger overlay for twitch

The burger overlay allows people in twitch chat to build burgers on stream by typing 'bun' and then different ingredients. 
To complete the burger type 'bun' by itself.
Examples of ingredients available are tomato, meat, cheese, onion, pickles 

## QUICKSTART

  1. You'll need OBS  
  2. Add a webpage overlay with the URL http://twitchchat.aaron-m.co.nz/do/[your_twitch_stream_user_name] 
```
http://twitchchat.aaron-m.co.nz/do/jaxwild
```
  3. In your stream chat type 'bun' and a bun should appear on stream. 

## INSTALL
 
  To install the code you'll need to setup a webserver and deploy the built source to it.
  Once installed if you go to the URL: http://[yourserver]/do/[twitch_stream_name] it'll load the overlay in your browser.
  Test it by typing 'bun' in twitch chat and a bun should appear in the browser.
  
  An example install is available at http://twitchchat.aaron-m.co.nz/do/jaxwild

## BURGER WORDS

bread, bun, tomatoes, tomato, meat, beef, chicken, banana, bensnsbd, egg, shoe, cheese, cucumber, salami, pepperoni, chorizo, sausage, bacon, beetroot, beets, lettuce, romaine, onion, mustard, mayo, mayonaise, aioli, ranch, ketchup, sauce, pickles, pickle, pineapple, 

### new words
jam, banana, sliced banana, avocado, sliced avocado, chicken, beef

## IN CHANNEL COMMANDS

All commands are saved between uses of the overlay

| Command       | Expected values       | Description                                                                                                                        |
|---------------|-----------------------|------------------------------------------------------------------------------------------------------------------------------------|
| --show-name   | on, off               | Set on or off to hide or show burger names                                                                                         |
| --name        | Any string of letters | Name your burger whilst in progress                                                                                                |
| --expanded    | on, off               | Expand your burger to get a good look at all the ingredients                                                                       |
| --auto-finish | on, off               | If set to off the burger will not complete when top bun is put on, unless owner or mod uses --finish                               |
| --finish      |                       | Will finish the current burger and put it in the burger bar                                                                        |
| --topple      | on, off               | When burger height reaches 20 or the height specified by --threshhold, the burger has a chance to fall over after every item added |
| --threshhold  | Number above 2        | Will change the number of items it takes for the burger to become unstable used in the --topple command                            |
| --maxtype     | Number                | Will set how many ingredients of one type can be in one burger, 0 for  infinite                                                    |
| --volume      | Number                | A number over 0 and under 100 will turn on eating sounds when a burger is finished                                                 |
|               |                       |                                                                                                                                    |
|               |                       |                                                                                                                                    |


## ACKNOWLEDGEMENTS

*  Zenril/Fax - Programmer and Artist
*  WootoSmash - Shitposter and bug finder/suggester
  
## LICENSE - MIT
 
Copyright 2017 Zenril/Fax

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
