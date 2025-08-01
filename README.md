# Unferib
### What's this thing do?

It's a stupid simple, barebones **constant dumper.**

Basically, it just yanks out the easy stuff from a script:
*   Strings
*   Numbers
*   Booleans

That's literally it. It's a quick and dirty way to peek inside.

### What this thing is NOT

Just so we're clear, this is **NOT**:
*   A full decompiler. Don't expect magic.
*   An instruction dumper or anything complex.
*   Polished, pretty, or probably even that well-written, lmao.
*   An attack on anyone. Seriously, it's all just for fun and learning.

### How to Use

This is a command-line tool. You run it straight from your terminal.

Just pass the big payload string as an argument right after the file name. Like this:

```bash
node your-script-name.js <the_big_long_payload_string_goes_here>
```

**For example:**
```bash
node unferib.js LOL!023Q0003053Q007072696E742Q033Q0061736400043Q0012013Q00013Q001202000100028Q000200012Q00033Q00017Q00
```

If you forget to add the payload, the script will let you know what's up.

It'll spit out the constants it found. Job done.
