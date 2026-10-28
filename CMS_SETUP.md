# Projects CMS — setup & API

The scroll gallery and the projects grid are both driven by MongoDB. The home page reads the
data on the server (ISR, revalidated every 60 s and immediately after every CMS save).
If MongoDB is not configured, unreachable, or still empty, the site falls back to `lib/data.js`.

## 1. MongoDB Atlas
1. Create a free cluster and a database user.
2. Under **Network Access** allow `0.0.0.0/0` (Netlify functions have no fixed IP).
3. Copy the connection string into `MONGODB_URI`.

## 2. Environment variables
Netlify → Site configuration → Environment variables (and `.env.local` for local dev).

| Name | Purpose |
|---|---|
| `MONGODB_URI` | Atlas connection string |
| `MONGODB_DB` | Database name (e.g. `portfolio`) |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `ADMIN_SECRET` | Random string that signs the login cookie (`openssl rand -hex 32`) |
| `NEXT_PUBLIC_SITE_URL` | Your live URL |

Your existing SMTP / counter variables are unchanged. See `.env.example`.

## 3. Run locally
```bash
cp .env.example .env.local   # fill it in
npm install
npm run dev                  # site: http://localhost:3000   CMS: http://localhost:3000/admin
```
Open `/admin`, sign in, and click **Import starter projects** once. This copies the projects
from `lib/data.js` into MongoDB (safe to re-run; existing slugs are skipped).

## 4. Deploy to Netlify
Push to Git, then **Add new site → Import from Git**. `netlify.toml` sets the build command and
Node 22, and Netlify detects Next.js automatically. Add the variables above and deploy.

## Managing content
`/admin` lets you create / edit / delete projects, upload an image (resized in the browser and
stored in MongoDB), toggle **Published**, **Featured** and **Show in scroll gallery**, and reorder
with the arrows. Projects without an image show a live screenshot of their website.

## API
Public
- `GET /api/projects` — optional `?category=` `?featured=true` `?gallery=true` `?q=` `?limit=`
- `GET /api/projects/:idOrSlug`
- `GET /api/media/:id`

Admin (cookie issued by `POST /api/admin/session` with `{ "password": "..." }`)
- `POST /api/projects`
- `PUT | PATCH | DELETE /api/projects/:id`
- `POST /api/projects/reorder` with `{ "ids": ["<id>", "..."] }`
- `GET /api/projects?includeDrafts=true`
- `POST /api/media` with `{ "dataUrl": "data:image/jpeg;base64,...", "name": "x.jpg" }`
- `POST /api/admin/seed`

Project shape:
`name, slug, url, tag, category, summary, points[], metrics[{label,value}], tech[], image, featured, inGallery, published, order`
