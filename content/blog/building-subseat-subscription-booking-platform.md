---
title: 'Building Subseat: Subscription Booking for Beauty & Wellness '
slug: 'building-subseat-subscription-booking-platform'
date: '2025-12-27'
description: 'A behind-the-scenes look at the product and engineering work I’m leading at Subseat: subscription-based booking that helps customers keep their favourite slots and helps businesses grow predictable recurring revenue.'
category: 'Engineering'
tags: ['Startups', 'Product Strategy', 'Subscriptions', 'Booking', 'Beauty & Wellness', 'B2B SaaS', 'Marketplace']
image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80'
featured: true
author: 'Edward Whitehead'

# SEO and AEO metadata fields
metaTitle: 'Building Subseat: Subscription Booking for Beauty & Wellness | Edward Whitehead'
metaDescription: 'CTO notes from Subseat: how we’re building subscription-based booking for beauty & wellness—priority slots for customers, predictable income for businesses, and a product that strengthens loyalty.'
keywords:
  - 'subscription booking'
  - 'beauty and wellness booking'
  - 'barber subscription'
  - 'salon subscription model'
  - 'recurring revenue for service businesses'
  - 'client retention'
  - 'appointment scheduling'
  - 'creator economy'
  - 'service marketplace'
ogTitle: 'Building Subseat: Subscription Booking for Beauty & Wellness'
ogDescription: 'A behind-the-scenes look at the product and engineering work I’m leading at Subseat: subscription booking that improves customer loyalty and business predictability.'
ogImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80'
twitterTitle: 'Building Subseat: Subscription Booking'
twitterDescription: 'How we’re building subscription booking for beauty & wellness: priority booking for customers, predictable recurring revenue for businesses.'
twitterImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80'
twitterCard: 'summary_large_image'
canonicalUrl: 'https://edwardwhitehead.dev/blog/building-subseat-subscription-booking-platform'

structuredData:
  "@context": "https://schema.org"
  "@type": "BlogPosting"
  "headline": "Building Subseat: Subscription Booking for Beauty & Wellness"
  "description": "A behind-the-scenes look at the product and engineering work I’m leading at Subseat: subscription-based booking that helps customers keep their favourite slots and helps businesses grow predictable recurring revenue."
  "author":
    "@type": "Person"
    "name": "Edward Whitehead"
    "url": "https://edwardwhitehead.dev"
  "datePublished": "2025-12-27"
  "dateModified": "2025-12-27"
  "mainEntityOfPage":
    "@type": "WebPage"
    "@id": "https://edwardwhitehead.dev/blog/building-subseat-subscription-booking-platform"
  "publisher":
    "@type": "Person"
    "name": "Edward Whitehead"
  "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80"
  "articleSection": "Engineering"
  "keywords": ["Subscriptions", "Booking", "Beauty & Wellness", "Product Strategy"]
---

# Building Subseat: Subscription Booking for Beauty & Wellness

Subseat’s tagline is simple: **“Your Seat, Your Subscription.”**

We’re building a subscription-based booking platform for beauty & wellness—so customers can reliably book with the providers they trust (barbers, stylists, nail techs, and wellness professionals), and businesses can grow predictable recurring revenue with stronger client loyalty.

I’m the CTO at Subseat. I’m responsible for the technical and product decisions—but I’m also intentional about making sure Subseat’s story is bigger than me. This post is a snapshot of what we’re building and the principles guiding it.

## What Subseat is (in one sentence)

Subseat is a subscription booking platform that helps customers **stop fighting for appointments** and helps service businesses **turn one-time visitors into regulars**.

## How it works (high level)

The customer experience is designed to be straightforward:

1. Choose your provider
2. Select a subscription plan
3. Book instantly (with priority access)
4. Show up and enjoy the service

On the business side, the model is built around recurring revenue and better calendar utilization—supported by a management dashboard, analytics, and automated reminders.

## The two-sided problem we’re solving

Beauty & wellness has a unique friction profile:

- Customers want consistency: the same provider, the same vibe, the same time slot.
- Providers need predictability: fewer empty seats, fewer no-shows, and steadier cash flow.

Subscriptions can align both sides—but only if the experience is seamless and the rules are clear.

That’s the core product challenge: make subscriptions feel like a benefit, not a lock-in.

## What I focus on as CTO

My job is less about “choosing the stack” and more about building a system that can scale trust.

Here are the areas I spend the most time on:

### 1. Product clarity

If a customer can’t answer these questions in seconds, we’ve failed:

- What am I subscribing to?
- How often can I book?
- What happens if I need to reschedule?
- What happens if my provider is unavailable?

Subseat’s product pages and FAQ are shaped around this: simple steps, transparent pricing, and clear expectations.

### 2. Subscription mechanics (without the headaches)

Subscriptions only work when the edge cases are handled well:

- reschedules and cancellations that don’t create conflict
- fair usage rules that protect providers
- prioritised booking that feels real (not marketing)

This is where product design and engineering meet: the logic has to be right, and the UX has to be obvious.

### 3. Business outcomes (not vanity features)

We prioritise features that directly support:

- predictable revenue
- loyalty / retention
- calendar health
- reduced no-shows

That includes a business dashboard for tracking subscriptions and bookings, plus automated reminders to reduce last-minute gaps.

### 4. Operational reliability

In subscription businesses, reliability is the product.

If booking is slow, reminders are late, or a provider’s calendar isn’t accurate, trust disappears—and churn follows. A big part of my role is establishing quality bars (observability, safe releases, and a bias toward simplicity).

## Promoting Subseat without making it “the CTO show”

Founders and early leaders naturally become the loudest voice. That can help early on—but it can also accidentally make the brand feel like a personal brand.

My goal is to promote Subseat in a way that points attention where it belongs:

- the customer problem (booking friction)
- the providers and businesses we serve
- the product outcomes (simplicity, loyalty, predictability)

Practically, that means sharing:

- product updates framed around user value
- customer and provider stories
- the mission: simplifying self-care bookings through subscriptions that empower creators and strengthen customer loyalty

If you follow Subseat on social, you’ll see more “here’s what Subseat unlocks” and less “here’s what I built.” That’s deliberate.

## Pricing philosophy (transparent and flexible)

Subseat’s site describes three business tiers:

- **Basic Seat**: free plan with a small commission on active subscribers
- **Partner Seat**: early access with extra perks and advanced analytics
- **Enterprise Seat**: custom solutions, including API access and integrations

The goal is to support new businesses and established operators without forcing the same plan onto everyone.

## What we’re building toward

The long-term vision is a system where:

- customers have a dependable routine with providers they trust
- providers have a recurring base they can build a business around
- subscriptions improve the experience, not complicate it

If you’re a customer who wants guaranteed access to your favourite slot—or a business that wants predictable income—Subseat is for you.

## Join the waitlist

Subseat is currently building and onboarding via the waitlist.

- Website: <https://subseat.com/>
- Waitlist: <https://subseat.com/#waitlist>

```text
#Subseat #Subscriptions #BeautyTech #WellnessTech #Booking #CreatorEconomy #SaaS #ProductStrategy
```
