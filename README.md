# Rapid Duck

DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to your browser. Enables all of DuckDuckGo's bangs to work, but much faster.


URL:
```
https://d.cutebear.in.th/search?q=%s
```

## Frequently Asked Questions (FAQs)

### How is it that much faster?
I solved this by doing all of the work client side. Once you've went to https://d.cutebear.in.th/ once, the JS is all cache'd and will never need to be downloaded again. Your device does the redirects, not me.

### Why is this better than DuckDuckGo?
DuckDuckGo does their redirects server side. Their DNS is...not always great. Result is that it often takes ages. I remade it by doing all of the redirects client side.

### Why cannot I use bang?
You need to put `!bang` at the start of the query. (Example: "`!wiki Isaac Newton`").

## Credits
Credit to the original code, [Unduck](https://github.com/T3-Content/unduck) by Theo Browne.
