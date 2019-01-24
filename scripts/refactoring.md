# Refactoring useful code

## fixed canvas

```
  var canvas = createCanvas(400, 400);
  canvas.parent('main-content');
```

## window sized canvas

```
  var wid = document.getElementById('main-content').offsetWidth;
  var hig = document.getElementById('main-content').offsetHeight;
  var canvas = createCanvas(wid, hig);
  canvas.parent('main-content');
