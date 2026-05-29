## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in this folder with:

```bash
DATABASE_URL=postgres://user:password@localhost:5432/bloggify
JWT_SECRET=replace-with-a-strong-secret
PORT=5000
```

3. Start the server:

```bash
npm run dev
```

## Notes

- The server reads `DATABASE_URL` and `JWT_SECRET` at startup.
- `npm run dev` uses `nodemon`.