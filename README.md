# Techie Adi — Developer Intro (Built with Code)

This repository contains my personal intro video created entirely using **Remotion**.

Instead of using traditional video editing software, this intro was built **programmatically** using React and animation logic. Every transition, motion, and typography effect is controlled through code.

---

## 🎥 Output Video

> **Note**: To view the final rendered video, render it locally or check the releases section once available.

To render this intro yourself:

```bash
npx remotion render src/index.ts GoogleIOIntro out.mp4
```

---
# Techie Adi — Developer Intro

## 🎬 Preview

<p align="center">
  <img src="./intro.mp4" alt="Techie Adi Intro Preview" width="800"/>
</p>


## 🚀 About This Project

This project represents:

- **Programmatic motion graphics** using React
- **Frame-based animation logic**
- **Clean developer-oriented design**
- **Keynote-inspired visual storytelling**

The goal was to create a modern identity intro using only code.

---

## 🛠 Tech Stack

- **Remotion** — Programmatic video creation
- **React** — Component-based architecture
- **TypeScript** — Type-safe development
- **CSS-in-JS** — Inline styling
- **Frame-based animation system** — Precise motion control

---

## 🎬 Rendering the Video

Make sure dependencies are installed:

```bash
npm install
```

To preview the intro:

```bash
npm run dev
```

Then open `http://localhost:3000` and select the composition.

To render the final video:

```bash
npx remotion render src/index.ts GoogleIOIntro out.mp4
```

---

## 📁 Project Structure

```
src/
 ├─ Intro/
 │   ├─ GoogleIOIntro.tsx      # Main composition (5 scenes)
 │   ├─ CleanText.tsx           # Reusable typography component
 │   └─ AccentElements.tsx      # Subtle visual embellishments
 └─ Root.tsx                    # Composition registration
```

---

## 🎨 Design Philosophy

This intro follows a **Google I/O developer keynote aesthetic**:

- Light, clean backgrounds
- Minimal but intentional motion
- Generous white space
- Subtle accent colors
- Material Design easing
- Professional, developer-oriented tone

**No cinematic darkness. No heavy effects. Just clean, intelligent design.**

---

## 📈 Future Improvements

This is the first iteration of my intro.

In the future, I plan to:

- Improve motion timing and transitions
- Refine typography hierarchy
- Enhance visual depth and polish
- Optimize animation curves
- Explore 3D integration if needed

This project will continue evolving as I refine my motion design and engineering skills.

---

## 💡 Why Code-Based Motion?

I believe **creative systems should be programmable**.

Using Remotion allows:

- ✅ **Precise control** over animation
- ✅ **Reusability** of components
- ✅ **Scalable design logic**
- ✅ **Engineering-driven creativity**

Traditional video editing is powerful, but code-based motion graphics enable a different kind of precision and iteration speed.

---

## 📝 License

This project is for personal use. Feel free to explore the code and learn from it.

---

**Built with React, TypeScript, and Remotion.**
