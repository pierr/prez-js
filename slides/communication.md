# Communication
--
## XMLHttpRequest
```:javascript
var req = new XMLHttpRequest();
req.open('GET', 'http://www.mozilla.org/', true);
req.onreadystatechange = function (aEvt) {
  if (req.readyState == 4) {
     if(req.status == 200)
      dump(req.responseText);
     else
      dump("Erreur pendant le chargement de la page.\n");
  }
};
req.send(null);	
```
- [MDN](https://developer.mozilla.org/fr/docs/XMLHttpRequest)
- [Example](../examples/index.html#ajax)

