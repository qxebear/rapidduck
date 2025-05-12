# Rapid Duck

DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to your browser. Enables all of DuckDuckGo's bangs to work, but much faster.

```
https://d.cutebear.in.th/?q=%s
```

## How is it that much faster?

DuckDuckGo does their redirects server side. Their DNS is...not always great. Result is that it often takes ages.

I solved this by doing all of the work client side. Once you've went to https://d.cutebear.in.th/?q=%s once, the JS is all cache'd and will never need to be downloaded again. Your device does the redirects, not me.

## Credits
Credit to the original code, [Unduck](https://github.com/t3dotgg/unduck) by Theo.
