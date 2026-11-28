// Calc-U-1600 — mounts the pinned Web frontend on /1600/play/.
// CalcU1600 is the embedding interface of calc/calc.js
// (docs/formats/web-embed.md of tinue/Calc-U); this page only sizes it to
// its box and hands ?model= and ?preset= on. Hand-written, not generated.
(function () {
  var holder = document.getElementById("calc");
  var q = new URLSearchParams(location.search);
  var root = ReactDOM.createRoot(holder);
  function render() {
    root.render(React.createElement(CalcU1600, {
      width: Math.floor(holder.clientWidth),
      height: Math.floor(holder.clientHeight),
      keyboard: true,
      layout: "auto",
      model: q.get("model") || undefined,
      preset: q.get("preset") || undefined,
    }));
  }
  new ResizeObserver(render).observe(holder);
})();
