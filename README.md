# Homework #6: Argumentative Vis

In this homework, you will create a pair of data visualizations that argue for opposing viewpoints, using the same base dataset.

Your completed submission should include the following files:
* `index.html`: The webpage with the visualizations.
* `data/`: The folder containing your dataset file(s).
* Any other necessary files like CSS, JS, etc.
* A screenshot image of your completed page, named according to your ASURITE (e.g., `cbryan16.png1`).

(If your dataset is larger than 10 MB, please only extract the portions needed for the visualizations.)

## Design requirements

Using techniques from the Storytelling lecture and the Visualization Rhetoric paper, you will create two visualizations about a dataset that frame the data with opposite narratives.

First, find a dataset about a "controversial" topic. In other words, you want a topic with strong opinions on both sides of the issue. Here are some examples of topics that could work: a political issue, science, religion, sociocultural, economics, immigration, sports, climate change, geopolitical sovereignty, etc. Topics from other regions or countries are also allowed. Good places to look for this data include Kaggle and news organizations that provide access to their data (538, New York Times, etc.). **You must pick a dataset/topic that is NOT related to your project.**

> ❗️ **COVID-19 datasets** are NOT allowed, though, you are free to look at examples of opposing COVID visualizations for inspiration.

Next, create your `index.html` page with two static visualizations placed side-by-side (one on the left, one on the right). The two visualizations should use the same base dataset. You are not required to use the same set of attributes and data points, and you are free to preprocess the data differently for each visualization (if desired), including aggregating data, filtering data, creating derived attributes etc. (Additionally, if the dataset contains multiple CSV/JSON/etc. files, you're allowed to use different files for each chart.) However, you must use the same source dataset (e.g., the same Kaggle dataset). Put another way, you cannot go find two datasts and merge them together. You would, however, be able to select different and non-overlapping subsets of a dataset, if you wish. Your charts should be static (i.e., no interactions, animations, etc.).

Your page content will look like this:
- At the top of your page, add your name and email, and a title for the assignment (similar to prior homeworks).
- Then, in 1-2 paragraphs, briefly introduce your topic, explain why it is considered controversial, and provide a link to the source dataset you use. 
- Below this, you'll have your two visualizations side-by-side. The left-side visualization should be rhetorically framed and designed to argue "in support" of the topic in some way, and the right-side visualization should be rhetorically framed to take the opposite perspetive (i.e., arguing against the topioc or viewpoint), similar to what many of you are doing for your scrollytelling projects. For each of the charts, include a title that's specific to that chart (this title may also be persuasive for the Yes/No position). Also add a brief caption directly below each chart that describes what the chart shows. (This caption may also help argue that chart's position or point!)
- Below your charts, add two writeups (one for the left chart, and one for the right), that describe the specific rhetorical techniques or framing effects you are using for each chart, and describe why you think they're persuasive.

Like for your scrollytelling projects, one way to consider this is by posing the topic as a question, and the two visualizations are two opposite answers it. The left-visualization could supports the "Yes" answer, and the right-visualization supports the opposite "No" answer. You can also frame it like a debate: one "team" (the left visualization) argues the affirmative position, while the other (the right visualization) argues the negative. 

Again, the trick is that you will use the _same base dataset_ for both visualizations (though, again, the subsets of the data that you pull may be different!), and you'll employ rhetorical techniques to help frame the data in opposing ways. The Hullman paper on framing effects (Visualization rhetoric: Framing effects in narrative visualization) describes an extensive collection of framing and styling techniques you can use to help frame your visualizations for promoting a specific viewpoint, story, or argument. You can also the lecture slides for ideas of specific rhetorical techniques. You are free to use any visualization techniques and rhetorical framing devices you like, but you should only create ONE main visualization for each side. (In other words, don’t make a collection of several charts to argue Yes or No, just have one for each side. However, it’s okay to inset or annotate a smaller chart within your primary chart.) You're allowed to pre-process the data or break up the data into multiple files if necessary, and are allowed to integrate additional information, images, factoids, etc. from additional sources, e.g., as annotations, background layers, etc.

To finish, take a screenshot of your completed page and name it `asurite.png` after your ASUTE. (For example, mine would be `cbryan16.png`.) Include this png file in the base folder of your submission.

## Grading 

This assignment is worth 10 points. Be sure to organize and lay out your page nicely, with nicely styled elements. Up to +2 bonus points will be considered for submissions that go above and beyond (e.g., creating particularly compelling or impressive argumentative visualizations, or clever use of rhetorical techniques). Extra credit points (or a lack thereof) are not reviewable based on grade appeals.

> ❗️ In previous years, students have posted this assignment as a part of their online portfolios. While we cannot prohibit you from reviewing such charts, you are not allowed to use their code, and we highly recommend not even looking at these until you submitted the assignment. Copying someone else's code/arguments, or using Generative AI to help complete this assignment, is considered plagiarism.
