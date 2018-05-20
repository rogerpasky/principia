# principia.js
Principia is a JavaScript library who offers virtual experiments to test and 
learn the laws of physics. This is not a perfect simulator, but it's good enough 
to have fun and enjoy the science for a while playing with the Universe in **God 
mode**.

Please go to [Principia Homepage](https://rogerpasky.github.io/principia/) to
enjoy some examples. More examples contribution is welcome.

## technical issues
I tried hard to use internally the actual numbers of the planets, but they are 
so huge they caused some overflow problems in JavaScript (you know, it is not 
the best language to have precise calculations because its float number 
precission limitations), so I had to use an arbitrary number (1e6) stored in the 
constant K to downscale it all.