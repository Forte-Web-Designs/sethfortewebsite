# Forte Signals — newsletter signup

Durable notes for the sethforte.com signup layer. GoHighLevel owns the
subscriber record; this repo owns the section that points at it.

## Form

| | |
|---|---|
| Form name | `Forte Signals \| SethForte.com` |
| Form ID | `jk4QZmJvhyvXfVtR6RhO` |
| Embed URL | `https://api.leadconnectorhq.com/widget/form/jk4QZmJvhyvXfVtR6RhO` |
| Embed script | `https://link.msgsndr.com/js/form_embed.js` |

This is the **SethForte.com** form, deliberately separate from the
LaunchForte.com one so the GHL workflow can stamp
`LF Newsletter Source = SethForte.com`. Do not swap in the LaunchForte form,
and do not add source tracking here — GHL already handles it.

## Where it lives

`index.html`, section `#signals`, between **Latest Writing** and the
**Launch Forte** pointer. A visitor reaches it after the work, the
testimonials and the writing, which is the moment the signup earns.

There is no local form handler, no local subscriber store, and no GHL custom
field IDs in this repo. The iframe posts straight to GHL.

## The live gate

The section ships **held**. One attribute controls it:

```html
<section class="studio-section" id="signals" data-signals-live="false">
```

- `"false"` → held notice shown, form hidden, iframe `src` parked in
  `data-src`, embed script not loaded. **Zero requests to LeadConnector.**
- `"true"` → form shown, notice hidden, `data-src` promoted to `src`, embed
  script loaded.

That parking matters: a hidden iframe still fetches its `src`, so without it a
held page would contact LeadConnector and a working form would sit one
devtools toggle away.

Other occurrences of `data-signals-live` are CSS selectors, a comment and the
JS check. **Only the `<section>` attribute is the switch.**

### Flip the gate only when all six are true

1. `mail.launchforte.com` shows VERIFIED in GoHighLevel.
2. `Forte Signals | SethForte.com Newsletter Signup` workflow is PUBLISHED.
3. Welcome email contains final Seth-approved copy.
4. A test submission has reached GHL.
5. Welcome email tested.
6. Unsubscribe tested.

## Reuse on article pages

The section is self-contained — markup plus a `.signals*` CSS block plus the
gated script. To place it on article/content pages later, copy all three; it
inherits the page's Studio tokens and needs no new variables.

## Privacy

Only this form creates newsletter consent. Contact and audit forms elsewhere
on the site do not subscribe anyone, and nothing here writes a local
subscriber record.
