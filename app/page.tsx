import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  CalendarDays,
  FileText,
  Users,
  Lock,
  Mail,
  Eye,
  EyeOff,
  BadgeDollarSign,
  GraduationCap,
  Sparkles,
  Heart,
  ChevronRight,
  PlayCircle,
  TimerReset,
  CircleHelp,
  Menu,
  X,
  ScrollText,
  Landmark,
  ClipboardCheck,
  Video,
  Award,
  Building2,
  BookMarked,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/6oU9ATfLv0JU5Gy11J7Zu00";

const courseLessons = [
  {
    title: "Orientation and Requirements",
    intro:
      "Welcome to the Christian Wedding Officiant Certification Program. This training is designed to give you biblical foundations, ceremony structure, pastoral awareness, and practical confidence so you can officiate with seriousness and professionalism.",
    sections: [
      {
        heading: "Course Purpose",
        body:
          "This program exists to train Christian wedding officiants to understand marriage as covenant before God, lead ceremonies with reverence, and serve couples with maturity, clarity, and confidence. It is not designed as a shallow information page, but as a structured training pathway."
      },
      {
        heading: "What You Must Complete",
        body:
          "To complete this course properly, the student should read all modules, complete all written assignments, answer module quiz questions, prepare a full ceremony script, and finish the final practicum. Certification should only be awarded on completion of the full path."
      },
      {
        heading: "How To Use This Course",
        body:
          "Study one module at a time. Read the Scripture references slowly. Take notes as you go. Complete the written work honestly. Speak the ceremony sections aloud rather than reading silently only. The course becomes more valuable when you practise delivery as well as absorb information."
      }
    ]
  },
  {
    title: "Lesson Pack: Sample Christian Ceremony Script",
    intro:
      "This lesson pack gives a ready-to-use example of how a Christian wedding ceremony can sound when structured properly.",
    sections: [
      {
        heading: "Opening Welcome",
        body:
          "Dearly beloved, we are gathered here today in the sight of God and before these witnesses to join this man and this woman in holy matrimony. Marriage is a sacred covenant established by God, and it is not to be entered into lightly, but reverently, soberly, and in the fear of the Lord."
      },
      {
        heading: "Short Exhortation",
        body:
          "Today is a day of joy, but it is also a day of solemn commitment. Christian marriage is not built only on emotion, but on covenant, faithfulness, forgiveness, sacrifice, and love under God. Husband and wife are called to walk together in unity, honour one another, and build a home shaped by grace and truth."
      },
      {
        heading: "Declaration of Intent",
        body:
          "Will you take one another in covenant marriage, promising before God and these witnesses to love, honour, support, and remain faithful to one another as long as you both shall live? The response is: I will."
      },
      {
        heading: "Vows",
        body:
          "I take you to be my wedded spouse, to walk beside you in faithfulness, to love you, honour you, pray for you, and stand with you in joy and in trial, from this day forward, for as long as we both shall live."
      },
      {
        heading: "Ring Exchange",
        body:
          "These rings are a sign of covenant love and enduring faithfulness. As you place this ring on your spouse's finger, repeat after me: With this ring, I give you my love. With this ring, I pledge my faithfulness. With this ring, I honour the covenant we make before God today."
      },
      {
        heading: "Pronouncement and Blessing",
        body:
          "By the vows you have made, the promises you have spoken, and the covenant entered before God and these witnesses, it is my honour to pronounce you husband and wife. What God has joined together, let no one separate. May the Lord bless your marriage with steadfast love, patience, peace, and joy."
      }
    ]
  },
  {
    title: "Final Practicum Instructions",
    intro:
      "The final practicum is where the student demonstrates that the course has been understood and not merely skimmed.",
    sections: [
      {
        heading: "Written Submission",
        body:
          "Prepare a full Christian wedding ceremony script including opening welcome, exhortation, declaration of intent, vows, ring exchange, pronouncement, and final blessing. The script should be written in clear, respectful, ministry-appropriate language."
      },
      {
        heading: "Delivery Submission",
        body:
          "Read the ceremony aloud as though you were leading a real wedding. Focus on calmness, pacing, posture, confidence, and reverence. The goal is not speed, but competent leadership of the moment."
      },
      {
        heading: "Pass Standard",
        body:
          "A passing student should show biblical understanding, clear ceremony order, professional wording, and confident spoken delivery. A certificate should be awarded only when the training has clearly been completed to a competent standard."
      }
    ]
  }
];

const premiumModules = [
  {
    id: "m1",
    title: "Module 1: Biblical Foundations of Marriage",
    days: "Days 1–7",
    icon: BookMarked,
    objective:
      "Establish a Christian theology of marriage so the officiant understands covenant, Scripture, and sacred responsibility before leading any ceremony.",
    scriptures: [
      "Genesis 2:18–24",
      "Matthew 19:4–6",
      "Ephesians 5:21–33",
      "1 Corinthians 13:4–8",
      "Ecclesiastes 4:9–12",
      "Colossians 3:12–14",
    ],
    readings: [
      {
        label: "Reading 1.1",
        title: "Marriage as Covenant Rather Than Contract",
        body:
          "Christian marriage is not merely a social agreement or emotional arrangement. It is a covenant before God. The officiant must understand this distinction because the language, tone, and gravity of the ceremony all flow from covenant. A contract is often built around exchange and conditions, but covenant is built around faithfulness, sacrifice, and permanence. The officiant therefore stands before the congregation not as an entertainer, but as a servant helping two people publicly enter a holy commitment before God and witnesses.",
      },
      {
        label: "Reading 1.2",
        title: "Why Scripture Must Shape the Ceremony",
        body:
          "A Christian wedding is strongest when Scripture does more than decorate the service. It should frame the meaning of marriage itself. The officiant should know why key passages matter and when to use them. Scripture grounds the ceremony, restrains sentimentality, and gives weight to vows. It also reminds the couple that the centre of marriage is not merely romance, but faithfulness under God.",
      },
      {
        label: "Reading 1.3",
        title: "The Officiant’s Spiritual Responsibility",
        body:
          "The officiant is not responsible for creating the marriage, but is responsible for honouring the seriousness of the moment. That means careful wording, biblical integrity, pastoral restraint, and visible reverence. If the officiant treats the ceremony casually, the congregation feels it. If the officiant understands the sacredness of marriage, the entire room feels the difference.",
      },
    ],
    video: {
      title: "Video Session: Biblical Meaning of Marriage",
      description:
        "Recommended production: 8–12 minute teaching video explaining covenant, one-flesh union, spiritual responsibility, and how these truths shape the officiant’s language.",
    },
    assignment: {
      title: "Module 1 Written Assignment",
      instruction:
        "Write 400–600 words explaining why a Christian wedding officiant must understand the biblical foundations of marriage before leading a ceremony. Refer to at least two Scripture passages from this module.",
    },
    quiz: [
      "How does Scripture distinguish covenant from contract?",
      "Why should Genesis 2:24 matter to an officiant?",
      "What role does Ephesians 5 play in Christian marriage teaching?",
      "Why is biblical depth essential to the ceremony tone?",
      "Name three passages suitable for a Christian wedding reading.",
    ],
  },
  {
    id: "m2",
    title: "Module 2: The Calling and Role of the Christian Wedding Officiant",
    days: "Days 8–14",
    icon: Landmark,
    objective:
      "Train the learner to understand the pastoral, presentational, and spiritual duties of an officiant before, during, and after the ceremony.",
    scriptures: ["1 Peter 5:2–3", "James 3:1", "Colossians 3:17"],
    readings: [
      {
        label: "Reading 2.1",
        title: "The Officiant Is Not a Host — He or She Is a Guide",
        body:
          "A host welcomes people. An officiant guides a sacred moment. The Christian officiant provides order, steadiness, and spiritual clarity. This requires more than reading from a page. It requires preparation, warmth, self-control, and the ability to lead without drawing attention away from the couple or the Lord.",
      },
      {
        label: "Reading 2.2",
        title: "Character Before Performance",
        body:
          "A strong officiant should be reverent, punctual, composed, modest, and dependable. The role is not about personality projection. It is about faithful service. The couple should feel supported, not overshadowed. The congregation should feel led, not managed. Character gives authority to the words being spoken.",
      },
      {
        label: "Reading 2.3",
        title: "Pre-Ceremony Preparation and Pastoral Care",
        body:
          "Preparation includes pronunciation of names, review of the order of service, timing, contact with the couple, and understanding the emotional tone of the day. Pastoral care means listening well, communicating clearly, and helping the couple approach their vows with seriousness rather than panic.",
      },
    ],
    video: {
      title: "Video Session: Presence, Tone, and Leadership",
      description:
        "Recommended production: 10-minute instructional video on officiant posture, tone of voice, rehearsal leadership, and pre-ceremony preparation.",
    },
    assignment: {
      title: "Module 2 Reflection Assignment",
      instruction:
        "Write 400–600 words describing the qualities required of a Christian wedding officiant. Explain why preparation, character, and pastoral sensitivity matter.",
    },
    quiz: [
      "Why is an officiant more than a public speaker?",
      "Name four practical responsibilities of the officiant.",
      "Why should the officiant avoid making the ceremony about themselves?",
      "What preparation steps should happen before ceremony day?",
      "How does pastoral sensitivity improve the wedding experience?",
    ],
  },
  {
    id: "m3",
    title: "Module 3: Ceremony Structure and Script Writing",
    days: "Days 15–24",
    icon: ScrollText,
    objective:
      "Teach the student how to write a structured Christian ceremony that feels reverent, coherent, and personal rather than generic or awkward.",
    scriptures: ["Psalm 127:1", "Romans 12:10", "Philippians 2:2–4"],
    readings: [
      {
        label: "Reading 3.1",
        title: "The Standard Flow of a Christian Wedding Ceremony",
        body:
          "A solid ceremony normally includes welcome, opening remarks, prayer or Scripture, message, declaration of intent, vows, ring exchange, pronouncement, and blessing. The officiant must know what each section is designed to accomplish. Ceremony order should feel purposeful, not improvised.",
      },
      {
        label: "Reading 3.2",
        title: "Writing Opening Remarks That Feel Weighty",
        body:
          "Opening remarks should honour the moment, welcome the guests, and frame the purpose of the ceremony. They should not sound like a random speech. A good opening settles the room, focuses attention, and establishes reverence before vows begin.",
      },
      {
        label: "Reading 3.3",
        title: "How to Write Personal But Disciplined Ceremony Language",
        body:
          "Personalisation adds warmth, but too much informality weakens the ceremony. The officiant should balance beauty, clarity, and discipline. Language should feel honourable, Christian, and memorable without sounding theatrical or cheap.",
      },
    ],
    video: {
      title: "Video Session: Writing a Full Ceremony Script",
      description:
        "Recommended production: screen-share or teaching video walking through the structure of a wedding ceremony line by line.",
    },
    assignment: {
      title: "Module 3 Script Draft Assignment",
      instruction:
        "Write a full draft ceremony including opening words, a short message, declaration of intent, vows, ring exchange, pronouncement, and closing blessing.",
    },
    quiz: [
      "What are the core stages of a Christian wedding ceremony?",
      "Why should opening remarks set tone and order?",
      "What weakens a script and makes it sound cheap?",
      "How should Scripture be placed within the ceremony?",
      "Why must personalisation remain disciplined?",
    ],
  },
  {
    id: "m4",
    title: "Module 4: Delivering the Ceremony with Confidence",
    days: "Days 25–32",
    icon: Video,
    objective:
      "Train the learner to deliver the ceremony with confidence, timing, calmness, and visible competence in front of guests.",
    scriptures: ["Ecclesiastes 3:7", "Proverbs 15:23"],
    readings: [
      {
        label: "Reading 4.1",
        title: "Voice, Pace, and Presence",
        body:
          "Confidence is not shouting. It is steadiness. The officiant should speak with a measured pace, clear articulation, and enough presence that the room relaxes under their guidance. Rushing destroys solemnity. A disciplined pace creates dignity.",
      },
      {
        label: "Reading 4.2",
        title: "How to Handle Nerves, Silence, and Emotion",
        body:
          "A ceremony is emotional. Tears, pauses, and nerves are normal. The officiant should remain calm and allow meaningful pauses rather than panicking. Silence is not always failure. Sometimes silence is where the moment breathes.",
      },
      {
        label: "Reading 4.3",
        title: "Rehearsal Leadership and Day-of-Ceremony Control",
        body:
          "The officiant should know where each person stands, when to cue movement, and how to maintain flow if something goes off-script. This is where preparation turns into confidence. Good ceremony leadership protects the couple from chaos.",
      },
    ],
    video: {
      title: "Video Session: Practical Delivery Training",
      description:
        "Recommended production: delivery demonstration with examples of posture, mic handling, hand placement, pauses, pacing, and ring-exchange cueing.",
    },
    assignment: {
      title: "Module 4 Delivery Practicum",
      instruction:
        "Record yourself delivering the opening, vows, ring exchange, and pronouncement of a ceremony. Review the recording and note where pacing, clarity, or confidence need improvement.",
    },
    quiz: [
      "Why does pacing matter in a ceremony?",
      "How should an officiant handle emotional pauses?",
      "What rehearsal issues should be checked in advance?",
      "How does posture affect perceived confidence?",
      "Why is calmness more powerful than speed?",
    ],
  },
  {
    id: "m5",
    title: "Module 5: Legal, Administrative, and Pastoral Responsibilities",
    days: "Days 33–40",
    icon: ClipboardCheck,
    objective:
      "Help the student handle the practical side of officiating: expectations, professionalism, documents, boundaries, and post-ceremony responsibility.",
    scriptures: ["Romans 13:1", "1 Corinthians 14:40"],
    readings: [
      {
        label: "Reading 5.1",
        title: "Legal Awareness and Jurisdiction",
        body:
          "Wedding law differs by location. The officiant must not make claims they cannot support. They should clearly understand what is legally required in their area and what remains the responsibility of the couple. Integrity here protects both the officiant and the marriage ceremony itself.",
      },
      {
        label: "Reading 5.2",
        title: "Professional Communication with Couples",
        body:
          "High-value service includes clean communication. The officiant should be clear about what is included, what they need from the couple, when drafts are delivered, and what the day-of process will look like. Professionalism is not coldness; it is clarity.",
      },
      {
        label: "Reading 5.3",
        title: "Pastoral Boundaries and Ethical Conduct",
        body:
          "The officiant may hear emotional, spiritual, or private details while preparing the ceremony. This requires discretion and maturity. Confidentiality, respect, and restraint are part of the role. Ethical behaviour is part of Christian witness.",
      },
    ],
    video: {
      title: "Video Session: Professional Standards for Officiants",
      description:
        "Recommended production: practical teaching on communication, rehearsal expectations, legal disclaimers, and day-of professionalism.",
    },
    assignment: {
      title: "Module 5 Professional Readiness Assignment",
      instruction:
        "Write a professional checklist covering your communication with a couple from first inquiry to post-ceremony completion.",
    },
    quiz: [
      "Why must officiants understand local legal requirements?",
      "What should be communicated clearly to every couple?",
      "Why do pastoral boundaries matter?",
      "How does professionalism affect perceived value?",
      "What mistakes make an officiant look unprepared?",
    ],
  },
  {
    id: "m6",
    title: "Module 6: Final Assessment, Grading, and Certification",
    days: "Days 41–45",
    icon: Award,
    objective:
      "Require the student to complete written, theological, and practical assessments before certification is granted.",
    scriptures: ["2 Timothy 2:15", "James 1:22"],
    readings: [
      {
        label: "Final Assessment Brief",
        title: "Certification Is Earned Through Demonstrated Competence",
        body:
          "This course should not award certification merely because someone scrolled to the bottom. Certification should follow clear evidence of understanding, preparation, biblical maturity, and practical competence. That is what protects value.",
      },
    ],
    video: {
      title: "Video Session: What a Passing Final Practicum Looks Like",
      description:
        "Recommended production: walk-through of a strong sample practicum and the grading criteria expected for certification.",
    },
    assignment: {
      title: "Final Practicum Submission",
      instruction:
        "Submit a complete Christian wedding ceremony script, a 500-word statement of biblical understanding, and a recorded delivery of the opening, vows, ring exchange, and pronouncement.",
    },
    quiz: [
      "What biblical foundations must appear in a Christian ceremony?",
      "What core elements must be present in the final script?",
      "Why should certification require a practicum?",
      "What standards separate a pass from a fail?",
      "Why does a grading system increase course value?",
    ],
  },
];

const pricingTiers = [
  {
    name: "Certification Access",
    price: 199,
    setup: 0,
    transactionFee: "Stripe rates apply",
    bestFor: "Students seeking the full Christian wedding officiant certification track",
    features: [
      "6 structured training modules",
      "Biblical foundations included as core study",
      "Written assignments and module quizzes",
      "Final practicum and grading rubric",
      "Certificate request and completion flow",
      "One-time payment, no subscription",
    ],
    highlighted: true,
  },
  {
    name: "Coaching Upgrade",
    price: 349,
    setup: 0,
    transactionFee: "Stripe rates apply",
    bestFor: "Students wanting script review and higher-touch support",
    features: [
      "Everything in Certification Access",
      "One script review round",
      "Rehearsal and delivery checklist",
      "Priority support workflow",
      "Private feedback notes",
    ],
  },
  {
    name: "Ministry Bundle",
    price: 499,
    setup: 0,
    transactionFee: "Stripe rates apply",
    bestFor: "Students wanting officiant training plus ministry-facing templates",
    features: [
      "Everything in Coaching Upgrade",
      "Expanded wedding script library",
      "Pre-marital meeting framework",
      "Pastoral communication templates",
      "Certificate and ministry branding pack",
    ],
  },
];

const premiumFeatures = [
  {
    icon: BookOpen,
    title: "Structured certification program",
    text: "A real course flow with modules, readings, assignments, quizzes, practicum, grading, and completion standards.",
  },
  {
    icon: Landmark,
    title: "Biblical depth built in",
    text: "Scripture is not optional decoration here. It is a required foundation of the program and the ceremony model.",
  },
  {
    icon: Video,
    title: "Video-ready delivery model",
    text: "Every module includes a clear video placement so you can upgrade into a richer teaching experience over time.",
  },
  {
    icon: Award,
    title: "Assessment-led certification",
    text: "Learners complete knowledge checks, written reflections, and a final practicum before certification is awarded.",
  },
];

function money(n) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);
}

function Header({ currentView, setCurrentView, onOpenAuth }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Overview", "landing"],
    ["Curriculum", "curriculum"],
    ["Course Access", "course"],
    ["Pricing", "pricing"],
    ["Student Portal", "dashboard"],
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button onClick={() => setCurrentView("landing")} className="flex items-center gap-3 text-left">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">High-Ticket Training Platform</div>
            <div className="text-lg font-semibold tracking-tight text-slate-900">Wedding Officiant Certification</div>
          </div>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map(([label, key]) => (
            <Button key={key} variant={currentView === key ? "default" : "ghost"} className="rounded-xl" onClick={() => setCurrentView(key)}>
              {label}
            </Button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" className="rounded-xl" onClick={() => onOpenAuth("login")}>Student login</Button>
          <Button className="rounded-xl" onClick={() => window.open(STRIPE_PAYMENT_LINK, "_blank")}>Enrol now</Button>
        </div>

        <Button variant="ghost" size="icon" className="rounded-xl md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6 lg:px-8">
            {links.map(([label, key]) => (
              <Button key={key} variant={currentView === key ? "default" : "ghost"} className="justify-start rounded-xl" onClick={() => { setCurrentView(key); setOpen(false); }}>
                {label}
              </Button>
            ))}
            <Separator className="my-2" />
            <Button variant="ghost" className="justify-start rounded-xl" onClick={() => onOpenAuth("login")}>Student login</Button>
            <Button className="justify-start rounded-xl" onClick={() => window.open(STRIPE_PAYMENT_LINK, "_blank")}>Enrol now</Button>
          </div>
        </div>
      )}
    </header>
  );
}

function AuthDialog({ open, setOpen, mode, setMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("Password123!");
  const [sent, setSent] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {mode === "login" && "Student login"}
            {mode === "signup" && "Create account"}
            {mode === "reset" && "Reset your password"}
          </DialogTitle>
          <DialogDescription>
            {mode === "login" && "Access your modules, assignments, grading, and certificate progress."}
            {mode === "signup" && "Create your account to enrol and access the training portal."}
            {mode === "reset" && "Enter your email and we’ll send a secure reset link."}
          </DialogDescription>
        </DialogHeader>

        {mode !== "reset" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-2xl pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-2xl pl-9 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-500">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button className="w-full rounded-2xl">{mode === "login" ? "Log in" : "Create account"}</Button>
            <div className="flex items-center justify-between text-sm">
              <button className="font-medium text-slate-600 hover:text-slate-900" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
                {mode === "login" ? "Need an account? Sign up" : "Already have an account? Log in"}
              </button>
              <button className="font-medium text-slate-600 hover:text-slate-900" onClick={() => { setMode("reset"); setSent(false); }}>
                Forgot password?
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email address</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-2xl pl-9" />
              </div>
            </div>
            <Button className="w-full rounded-2xl" onClick={() => setSent(true)}>
              <TimerReset className="mr-2 h-4 w-4" /> Send reset link
            </Button>
            {sent && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                Reset email queued for <span className="font-semibold">{email}</span>. Connect this to Supabase Auth, Clerk, or Firebase Auth in production.
              </div>
            )}
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900" onClick={() => setMode("login")}>
              Back to log in
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Landing({ setCurrentView }) {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge className="mb-5 rounded-full px-4 py-1.5 text-sm">
              <Sparkles className="mr-2 h-4 w-4" /> Christian wedding officiant certification program
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Build a real, faith-based officiant business with structured training, biblical foundations, and assessed certification.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              This program is built as a premium certification path — not a skimpy info page. Students move through Scripture, theology, ceremony writing, practical delivery, assignments, quizzes, and a final practicum before certification.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-2xl" onClick={() => window.open(STRIPE_PAYMENT_LINK, "_blank")}>Enrol for £199 <ChevronRight className="ml-2 h-4 w-4" /></Button>
              <Button size="lg" variant="outline" className="rounded-2xl" onClick={() => setCurrentView("curriculum")}>View curriculum</Button>
              <Button size="lg" variant="ghost" className="rounded-2xl" onClick={() => setCurrentView("dashboard")}>Preview student portal</Button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["6 modules", "Structured program"],
                ["Scripture-led", "Biblical foundation"],
                ["Final practicum", "Real certification flow"],
              ].map(([a, b]) => (
                <div key={a} className="rounded-2xl border bg-white p-4 shadow-sm">
                  <div className="text-2xl font-semibold text-slate-950">{a}</div>
                  <div className="text-sm text-slate-500">{b}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card className="rounded-[28px] border-slate-200 shadow-2xl">
              <CardHeader>
                <div className="mb-4 flex items-center justify-between">
                  <Badge variant="secondary" className="rounded-full px-3 py-1">Premium Course Preview</Badge>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <ShieldCheck className="h-4 w-4" /> One-time payment, no subscription
                  </div>
                </div>
                <CardTitle className="text-2xl">Wedding Officiant Certification</CardTitle>
                <CardDescription>
                  Christian training in theology, ceremony design, delivery, and certification assessment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 rounded-3xl bg-slate-50 p-5 sm:grid-cols-2">
                  <div>
                    <div className="text-sm text-slate-500">Enrolment fee</div>
                    <div className="mt-1 text-4xl font-semibold text-slate-950">{money(199)}</div>
                    <div className="mt-2 text-sm text-slate-500">Certification pathway with final practicum</div>
                  </div>
                  <div className="rounded-2xl border bg-white p-4">
                    <div className="text-sm text-slate-500">Includes</div>
                    <div className="mt-1 text-xl font-semibold">Modules, quizzes, assignments</div>
                    <div className="mt-2 text-sm text-slate-500">Student portal, progress, certificate request flow</div>
                  </div>
                </div>
                <div className="grid gap-3">
                  {premiumFeatures.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex gap-4 rounded-2xl border p-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-950">{item.title}</div>
                          <div className="text-sm leading-6 text-slate-600">{item.text}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function CourseAccessView() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="max-w-3xl">
          <Badge className="mb-4 rounded-full px-4 py-1.5">Actual course delivery</Badge>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-950">This is the real course content students are buying access to</h2>
          <p className="mt-4 text-lg text-slate-600">
            This page is here so the product is not just a promise. It contains real lesson material, practical ceremony wording, and the final practicum structure.
          </p>
        </div>

        {courseLessons.map((lesson) => (
          <Card key={lesson.title} className="rounded-3xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">{lesson.title}</CardTitle>
              <CardDescription className="text-base leading-7">{lesson.intro}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {lesson.sections.map((section) => (
                <div key={section.heading} className="rounded-2xl border p-5">
                  <div className="text-lg font-semibold text-slate-950">{section.heading}</div>
                  <div className="mt-2 text-sm leading-7 text-slate-700">{section.body}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function CurriculumView() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <Badge className="mb-4 rounded-full px-4 py-1.5">Full curriculum</Badge>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-950">A premium curriculum designed to feel like real training, not thin filler</h2>
          <p className="mt-4 text-lg text-slate-600">
            Each module contains required readings, core Scripture, written assignment work, video placeholders, and assessment prompts. This is built to support a high-ticket certification offer.
          </p>
        </div>

        <div className="space-y-6">
          {premiumModules.map((module) => {
            const Icon = module.icon;
            return (
              <Card key={module.id} className="rounded-3xl shadow-sm">
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{module.title}</CardTitle>
                        <CardDescription className="mt-2 text-base leading-7">{module.objective}</CardDescription>
                      </div>
                    </div>
                    <Badge className="rounded-full px-4 py-1.5">{module.days}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
                    <div className="rounded-2xl bg-slate-50 p-5">
                      <div className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">Required Scripture</div>
                      <div className="space-y-2 text-sm text-slate-700">
                        {module.scriptures.map((verse) => (
                          <div key={verse} className="rounded-xl border bg-white px-3 py-2">{verse}</div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-5">
                      <div className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">Video Component</div>
                      <div className="rounded-xl border bg-white p-4">
                        <div className="font-medium text-slate-950">{module.video.title}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-600">{module.video.description}</div>
                      </div>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={`${module.id}-readings`}>
                      <AccordionTrigger>Module readings and lesson content</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {module.readings.map((reading) => (
                            <div key={reading.title} className="rounded-2xl border p-4">
                              <div className="text-sm font-medium text-slate-500">{reading.label}</div>
                              <div className="mt-1 text-lg font-semibold text-slate-950">{reading.title}</div>
                              <div className="mt-2 text-sm leading-7 text-slate-700">{reading.body}</div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value={`${module.id}-assessment`}>
                      <AccordionTrigger>Assignment and quiz</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-5 lg:grid-cols-[1fr,1fr]">
                          <div className="rounded-2xl border p-4">
                            <div className="text-sm font-medium text-slate-500">Written assessment</div>
                            <div className="mt-1 text-lg font-semibold text-slate-950">{module.assignment.title}</div>
                            <div className="mt-2 text-sm leading-7 text-slate-700">{module.assignment.instruction}</div>
                          </div>
                          <div className="rounded-2xl border p-4">
                            <div className="text-sm font-medium text-slate-500">Quiz prompts</div>
                            <div className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
                              {module.quiz.map((q, idx) => (
                                <div key={q} className="rounded-xl bg-slate-50 px-3 py-2">{idx + 1}. {q}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PricingView() {
  const comparison = useMemo(() => pricingTiers, []);
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="max-w-3xl">
          <Badge className="mb-4 rounded-full px-4 py-1.5">Pricing</Badge>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-950">Positioned as a premium Christian officiant certification offer</h2>
          <p className="mt-4 text-lg text-slate-600">
            This pricing section is structured to support a high-ticket feel: real curriculum depth, assessed certification, and clear upgrade pathways.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {comparison.map((tier) => (
            <Card key={tier.name} className={`rounded-3xl ${tier.highlighted ? "border-slate-950 shadow-2xl" : "shadow-sm"}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  {tier.highlighted && <Badge className="rounded-full">Core offer</Badge>}
                </div>
                <CardDescription>{tier.bestFor}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-4xl font-semibold tracking-tight text-slate-950">{money(tier.price)}</div>
                  <div className="mt-1 text-sm text-slate-500">One-time payment. No subscription.</div>
                </div>
                <div className="space-y-3">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full rounded-2xl" variant={tier.highlighted ? "default" : "outline"} onClick={() => window.open(STRIPE_PAYMENT_LINK, "_blank")}>
                  Enrol now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardView() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="mb-4 rounded-full px-4 py-1.5">Student portal preview</Badge>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-950">What students see after enrolment</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              This portal view makes the program feel substantial: module progression, assessments, reading units, video sections, grading, and certificate completion.
            </p>
          </div>
          <div className="rounded-3xl border bg-white px-5 py-4 shadow-sm">
            <div className="text-sm text-slate-500">Progress preview</div>
            <div className="mt-1 text-3xl font-semibold">31%</div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl">Program roadmap</CardTitle>
              <CardDescription>Structured like a high-ticket certification path.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <Progress value={31} className="h-3" />
              <div className="space-y-3">
                {premiumModules.map((module, idx) => (
                  <div key={module.id} className="rounded-2xl border p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="font-medium text-slate-950">{module.title}</div>
                        <div className="text-sm text-slate-500">{module.days} · {module.readings.length} readings · quiz + assignment</div>
                      </div>
                      <Badge variant={idx < 2 ? "secondary" : "outline"} className="rounded-full">{idx < 2 ? "Unlocked" : "Upcoming"}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl">Assessment summary</CardTitle>
                <CardDescription>This is what makes the course feel earned rather than skimmed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-700">
                {[
                  ["Module quizzes", "6 required"],
                  ["Written assignments", "5 required"],
                  ["Final practicum", "1 submission"],
                  ["Minimum pass standard", "70%"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                    <span>{label}</span>
                    <span className="font-semibold text-slate-950">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl">Course assets</CardTitle>
                <CardDescription>Premium-feel resources bundled into the portal.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                {[
                  "Christian wedding ceremony master script",
                  "Scripture reading guide for weddings",
                  "Vow and ring exchange template pack",
                  "Couple interview worksheet",
                  "Final practicum submission guide",
                ].map((file) => (
                  <div key={file} className="flex items-center justify-between rounded-2xl border p-3">
                    <span>{file}</span>
                    <Button size="sm" variant="outline" className="rounded-xl">Preview</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr,auto,auto,auto]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Heart className="h-4 w-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-950">Wedding Officiant Certification</div>
              <div className="text-sm text-slate-500">Christian training platform</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
            A premium-positioned certification platform for Christian wedding officiants, built around biblical foundations, structured modules, assessment, and practicum-based completion.
          </p>
        </div>
        <div>
          <div className="mb-3 font-medium text-slate-950">Program</div>
          <div className="space-y-2 text-sm text-slate-600">
            <div>Curriculum</div>
            <div>Assignments</div>
            <div>Certification</div>
          </div>
        </div>
        <div>
          <div className="mb-3 font-medium text-slate-950">Student</div>
          <div className="space-y-2 text-sm text-slate-600">
            <div>Portal</div>
            <div>Password reset</div>
            <div>Progress</div>
          </div>
        </div>
        <div>
          <div className="mb-3 font-medium text-slate-950">Enrolment</div>
          <div className="space-y-2 text-sm text-slate-600">
            <div>One-time payment</div>
            <div>Stripe checkout</div>
            <div>Certificate request</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function WeddingOfficiantCertificationPlatform() {
  const [currentView, setCurrentView] = useState("landing");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      <Header currentView={currentView} setCurrentView={setCurrentView} onOpenAuth={openAuth} />
      {currentView === "landing" && <Landing setCurrentView={setCurrentView} />}
      {currentView === "curriculum" && <CurriculumView />}
      {currentView === "course" && <CourseAccessView />}
      {currentView === "pricing" && <PricingView />}
      {currentView === "dashboard" && <DashboardView />}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Card className="rounded-[28px] border-slate-200 bg-slate-950 text-white shadow-2xl">
            <CardContent className="grid gap-8 p-8 lg:grid-cols-[1fr,auto] lg:items-center">
              <div>
                <h3 className="text-3xl font-semibold tracking-tight">Built to support a premium offer</h3>
                <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                  {[
                    "Landing page with premium positioning",
                    "Structured curriculum with module depth",
                    "Biblical foundations as required core",
                    "Login and password reset UI",
                    "Student portal preview",
                    "Assignments, quizzes, and practicum flow",
                    "Stripe enrolment button wired in",
                    "Certificate-led completion design",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button size="lg" variant="secondary" className="rounded-2xl" onClick={() => window.open(STRIPE_PAYMENT_LINK, "_blank")}>Enrol via Stripe</Button>
                <Button size="lg" variant="outline" className="rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/10" onClick={() => setCurrentView("curriculum")}>Inspect curriculum</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-2xl">
              <TabsTrigger value="notes" className="rounded-2xl">Build notes</TabsTrigger>
              <TabsTrigger value="backend" className="rounded-2xl">Backend wiring</TabsTrigger>
              <TabsTrigger value="delivery" className="rounded-2xl">Delivery model</TabsTrigger>
            </TabsList>
            <TabsContent value="notes">
              <Card className="mt-6 rounded-3xl">
                <CardContent className="space-y-4 p-6 text-sm leading-7 text-slate-700">
                  <p>
                    This rebuilt version returns to the coded app path and positions the offer as a real certification business, not a thin placeholder. The curriculum is now structured around module depth, assignments, Scripture, and assessed completion.
                  </p>
                  <p>
                    The live Stripe payment link is already wired into enrol buttons so the coded experience can move directly into checkout once hosted.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="backend">
              <Card className="mt-6 rounded-3xl">
                <CardContent className="space-y-4 p-6 text-sm leading-7 text-slate-700">
                  <p>
                    Next production step: connect authentication to Supabase Auth or Clerk, connect Stripe webhooks to enrolment state, and store progress, quiz submissions, written assignments, and certificate approvals in Postgres.
                  </p>
                  <p>
                    Suggested tables: users, enrolments, modules, readings, quizzes, assignment_submissions, practicum_submissions, certificates, and payments.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="delivery">
              <Card className="mt-6 rounded-3xl">
                <CardContent className="space-y-4 p-6 text-sm leading-7 text-slate-700">
                  <p>
                    This program should be delivered as a gated student portal after payment: modules unlock in sequence, quizzes and assignments are submitted in-platform, and the final practicum is reviewed before certification is granted.
                  </p>
                  <p>
                    Video slots are included at module level so you can start with written teaching and add recorded sessions later without rebuilding the course structure.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
      <AuthDialog open={authOpen} setOpen={setAuthOpen} mode={authMode} setMode={setAuthMode} />
    </div>
  );
}
