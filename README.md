# Fuel Log

Snap a meal and get its calories, protein, carbs and fat. Log drinks and water, and see your days, weeks and months.

**Open it:** https://porkupine0.github.io/fuel-log/

## What it does

- **Snap a meal.** Take a photo (several foods are fine) and Claude reads it: a short description and the calories, protein, carbs and fat for each item. With quick snap on, the photo goes straight into today's log and is read in the background; tap the entry later to check it. With quick snap off, you check every photo before it's added.
- **Photos are deleted right away.** Each photo is shrunk on the phone, sent to Claude, and deleted as soon as the numbers come back. A photo taken with no connection waits on the phone until it's read. Photos never go into your Photos library.
- **Say what it is and how much you ate.** After you snap or pick a photo, Fuel Log shows it with a box to describe it or say how much you ate, quick buttons for all, ¾, ½ or ¼ of it, and the meal and time. Claude counts only what you ate. (Turn off "Ask about each photo" in Settings and snapped photos go straight in, with a caption box above the camera button instead.)
- **Nutrition labels.** Snap a label for exact numbers, then pick how many servings you had.
- **Describe it, or type the numbers.** Describe a meal in words, or enter exact numbers yourself.
- **Drinks and water.** One-tap water sizes and common drinks. Coffee, tea, soda, juice, milk and energy drinks count toward your water by how much water is in them; alcohol doesn't. Alcohol is counted in US standard drinks. Caffeine has a daily total and a bedtime cutoff.
- **Should I eat this?** Ask whether something fits what's left today, how much of it to eat, which dishes on a menu are best (snap the menu), or for a snack idea that suits the time of day and your macros so far.
- **Quick add.** One-tap meals you've saved, recent foods, and "repeat yesterday's lunch."
- **It learns your numbers.** Correct an item once and Fuel Log uses your numbers the next time that food shows up.
- **Stats.** Daily, weekly and monthly calories, macros, water, alcohol and caffeine, compared with the period before.
- **History.** Every day you've logged, and a search across everything you've eaten. All of it works offline.
- **Targets.** Daily targets, a target helper (from age, height, weight, activity and goal), an optional weekly calorie budget, and optional fiber, sugar and sodium.
- **Workout days.** A checkbox on Today adds extra calories and carbs on a day you work out. Set your usual workout days and it's checked for you; uncheck it on a day you skip.
- **Reminders.** Meal and water reminders added to your phone's Calendar.
- **Spreadsheets and backups.** Export every entry or daily totals as CSV. Save a backup file, or copy your log to the Home Screen app or another phone.

## Setting it up

1. Open https://porkupine0.github.io/fuel-log/ in Safari.
2. Tap Share, then **Add to Home Screen**, and open Fuel Log from the Home Screen. (A Home Screen app keeps its own data, separate from Safari, and iPhone won't clear it.)
3. Add your Claude API key in **Settings**:
   1. Sign in at [console.anthropic.com](https://console.anthropic.com/settings/keys).
   2. Under Billing, add a payment method and a few dollars of credit. A monthly spend limit is a good idea.
   3. Under API keys, create a key and paste it into Fuel Log, then tap **Test it**.

Water, drinks, saved meals and typed numbers work without a key. Photos, labels, descriptions and the "Should I eat this?" answers need it.

**Cost:** you pay Anthropic for what you use, about 2 to 4 cents per photo.

## Your data

Your log lives only on your phone, in the app's own storage. Nothing is stored on a server. The API key stays on the phone too, and is left out of backups unless you choose to include it when moving to another phone. Save a backup now and then (Settings → Backup & move); Fuel Log reminds you after a week.

## How it's built

One page, no build step:

- `index.html`: the whole app (HTML, CSS and JavaScript). The log is kept in IndexedDB on the phone.
- `sw.js`: offline support. Keeps the app, its icons and the Claude library on the phone.
- `vendor/anthropic-sdk-0.131.0.js`: the official Anthropic TypeScript SDK, bundled for the browser with esbuild (MIT license in `vendor/anthropic-sdk-LICENSE.txt`). Loaded only when a photo or description is read.
- `manifest.webmanifest` and `icons/`: the Home Screen icon. Regenerate the icons with `node source/make-icons.js` (needs Playwright); bump the `-v1` in the file names, `index.html`, `manifest.webmanifest` and `sw.js` when they change.

Changes to `sw.js` or the cached files should bump the cache name in `sw.js` (`fuellog-shell-v2`).

Deploy by pushing to `main` and `gh-pages`:

```
git push origin main main:gh-pages
```
