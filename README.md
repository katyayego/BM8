# BM8 Project: Roadtrip

## Inspiration
By 2025 the worldwide e-learning market is projected to be worth $325 billion. However we firmly believe that modern applications are not ready to support this kind of growth.

This gap in the market appears for two reasons:
- Online courses are mainly taught by a single instructor, not offering a diversity of ideas
- While self-taught resources are often hard to connect to other topics within the same subject 

With modern resources there is a trade-off between having a diversity of ideas and well-connected content for any given subject.

That's where Roadtrip comes in.

## What it does
Roadmap is an application that uses crowd-sourced data to generate dynamic maps of resources for any given subject. 

Users can publish their preferred method of learning about a topic, then connect it to other topics in a map to create a "diversity" of paths other users can take in learning about this subject.

By also looking at what paths have been commonly taken, Roadtrip can recommend what paths may best fit a user's needs or learning style. 

This system includes both a diversity of resource while still offering guidance in maneuvering the various self-taught resources.

## How we built it
We built this site using Reactjs (Frontend) and Flask (Backend). For React, both MaterialUI and Vis.js were used. For Flask, Sqlite3 and Gunicorn WSGI were used.

## Challenges we ran into
We ran into some issues in creating the full tool suite that allows users to edit their maps.

## Accomplishments that we're proud of
At the moment, we currently offer:
- The ability to see maps created by you and others
- A clean interface for interacting and learning with maps
- An API capable of developing your own maps
- An playground that wraps the API

## What's next for Roadtrip
Future goals include:
- Expand recommender system to give users a well-crafted experience
- Improve map development tools
- Build user base that contributes to community maps
- Explore private maps to be used by teams for activities such as onboarding and training
