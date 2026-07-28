# CHANGE_ME — Where to make a code change (for DevOps students)

You do **not** need to understand JavaScript to use this project.
There is exactly **one file** you edit to push a change through the whole
pipeline.

---

## The only file you edit

```
src/version.js
```

Open it. You'll see two lines with `// <-- CHANGE ME`:

```js
const RELEASE_NAME  = 'first-release';             // <-- CHANGE ME
const BUILD_MESSAGE = 'Hello from the pipeline!';  // <-- CHANGE ME
```

Change the text inside the quotes. That's it. For example:

```js
const RELEASE_NAME  = 'asha-team-a';
const BUILD_MESSAGE = 'Deployed by Asha on Monday';
```

Keep the quotes and the semicolon. Only change the words inside `' '`.

---

## The 3-step exercise

### 1. Edit and commit
Using the GitHub website (easiest):
1. Open `src/version.js` in your repo.
2. Click the ✏️ **pencil** (Edit) button.
3. Change the two values.
4. Scroll down, click **Commit changes** → **Commit directly to main**.

Or from your laptop:
```bash
# after editing the file
git add src/version.js
git commit -m "Update release name and message"
git push
```

### 2. Watch CI run
- Go to the **Actions** tab.
- You'll see your commit trigger the **CI-CD Pipeline** (the `build` job).
- It runs tests, SonarQube, and uploads to Nexus. Wait for the green check ✅.

### 3. Deploy it
- Actions tab → **CI-CD Pipeline** → **Run workflow** (top right).
- Choose **environment = dev**, keep **run_deploy** checked → **Run workflow**.
- After it finishes, open your app:  `http://<your-ec2-dev-host>:3000/`
- You should see your new `releaseName` and `buildMessage` in the response.
- Repeat with **environment = prod** (this may pause for approval).

---

## Where your change shows up

Your edited values appear on the deployed app's home route:

```
GET /
{
  "message": "Hello, DevOps student!",
  "releaseName": "asha-team-a",             <-- your change
  "buildMessage": "Deployed by Asha on Monday",  <-- your change
  "version": "42-a1b2c3d",
  "environment": "dev"
}
```

---

## Want to try more? (still no deep coding)

| Goal | What to do | What you'll see |
|---|---|---|
| Make CI **fail** | In `test/app.test.js`, change `expect(add(2, 3)).toBe(5)` to `toBe(6)` | Red ❌ build, pipeline stops |
| Trigger a **SonarQube** issue | In `src/utils.js`, add a line `const unused = 123;` inside a function | SonarQube flags an unused variable |
| Add a **new message route** | Copy the `/health` block in `src/server.js`, rename `/health` to `/ping` | New endpoint after deploy |

Undo any of these by reverting the line and pushing again.

---

## Files you normally DON'T touch

- `.github/workflows/cicd.yml` — the pipeline (only the lines marked `STUDENT:`)
- `scripts/*.sh` — deploy logic
- `deploy/*.service` — the systemd service
- `sonar-project.properties`, `package.json`

If you edit those by accident, download a fresh copy of the project.
