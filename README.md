# Accessibility for Whom? Perceptions of Mobility Barriers Across Disability Groups and Implications for Designing Personalized Maps
In our paper *Accessibility for Whom*, we present a large-scale online survey exploring how five mobility groups—users of canes, walkers, mobility scooters, manual wheelchairs, and motorized wheelchairs—perceive sidewalk barriers and differences therein.
Using 52 sidewalk barrier images, respondents evaluated their confidence in navigating each scenario. Our findings (N=190) reveal
variations in barrier perceptions across groups, while also identifying shared concerns.

Check out our [paper](https://dl.acm.org/doi/pdf/10.1145/3613904.3642089) and [video](https://youtu.be/53Cmxsqjphg) for more details.

![AccessibilityForWhom](/figures/figure-teaser.png)

This repository contains the survey application, image collection, and dataset and analysis for *Accessibility for Whom? Perceptions of Mobility Barriers Across Disability Groups and Implications for Designing Personalized Maps* by Chu Li, Rock Yuren Pang, Delphine Labbé, Yochai Eisenberg, Maryam Hosseini, Jon E. Froehlich. The paper was published in Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI’25).

## Survey Application
To evaluate mobility aid users' confidence in navigating sidewalk barriers, we built a custom web survey using ReactJS and Firebase. Our survey has three parts: (1) study overview and background information, (2) image-based sidewalk passability rating and pair-wise comparisons, and (3) a ranking of sidewalk factors. The full survey is available online at https://sidewalk-survey.github.io/.

See our [survey application code](/survey-app/) and paper for more details.

![Survey Interface](/figures/figure-comaprison-screenshot.png "This is the image caption")



## Sidewalk Image Dataset
Our survey uses sidewalk images as the primary stimulus. Participants respond to these images based on their mobility aid usage and lived experience.
We selected images from [Project Sidewalk](projectsidewalk.org) - an open-source tool where users label sidewalk conditions using street view imagery. Project Sidewalk has collected over one million labeled images across 21 cities in eight countries.
Since built environments differ by location (urban vs. rural), we focused on North American infrastructure. Our images come from Seattle, Oradell (NJ), Chicago, Columbus, and Mexico City.

Through team discussion, we selected 52 images covering 4 major label types and 9 tag categories. We simplified the severity scale to three levels (high, medium, low) and selected two images per tag category per severity level.

See our [sidewalk image dataset](/sidewalk-images/) and paper for more details.

## Dataset and Analysis

For open-ended questions, we used qualitative open coding ([Charmaz, 2006](https://books.google.com/books?hl=en&lr=&id=2ThdBAAAQBAJ&oi=fnd&pg=PP1&ots=f-mW6IjCDY&sig=Lwh5HMGqKNqE2hdUU2KvlS-eN4U)) to develop themes based on sidewalk barrier categories.
For the passability assessment (Part 2.1), we calculated how often participants answered "Yes," "No," or "Unsure" for each mobility aid group. We compared differences between mobility groups using mixed multinomial logistic regression ([Baker, 1994](https://doi.org/10.2307/2348134), [Guimaraes, 2004](https://doi.org/10.1177/1536867X0400400304), [Chen, 2001](https://www.jstor.org/stable/2685993)) and performed pairwise comparisons with Holm's correction Holm, 1979.
For the image comparison task (Part 2.2), we used Q scores ([Salesses et al., 2013](https://doi.org/10.1371/journal.pone.0068400)) to rank barrier passability. Q scores (0-10 scale) account for ties when participants selected "Unsure." We analyzed these scores using mixed-effects ordinal regression ([Hedeker & Gibbons, 1994](https://doi.org/10.2307/2533433)).
For the ranking task (Part 3), we used Kemeny-Young rank aggregation ([Young, 1988](https://doi.org/10.2307/1961757)), ([Young, 1995](https://doi.org/10.1257/jep.9.1.51)), ([Kemeny, 1959](https://www.jstor.org/stable/20026529)) to find the consensus ranking that minimizes the distance to all participant rankings.

See our [survey dataset and analysis code](/dataset-analysis/) and paper for more details.

## Applications
We demonstrate how our survey findings can be used to create accessibility-oriented analytical maps and personalized routing algorithms.

AccessScore maps visualizing sidewalk quality in Seattle for two groups: walking cane and mobility scooter (red is least accessible; green is most). Top two shows AccessScore by neighborhood; bottom two shows AccessScore by sidewalk segment. From the comparisons between walking cane users and mobility scooter users, we can see while downtown area may be equally accessible for both user groups, other areas are less accessible for mobility scooter users.
![Access Score](/figures/access-score-maps.png "This is the image caption")

Routing application using OSMnx to generate routes between A \& B based on our survey data. Yellow route shows the absolute shortest path; teal shows the route for walking cane, this route favours fewer sidewalk barriers regardless of category; purple shows the route for motorized wheelchair, this route avoids missing curb ramps at all costs. When hovering over the labels, users can see what the sidewalk issues look like in streetview.
![Routing Tool](/figures/figure-routing-application-new.png "This is the image caption")

See our [application prototype code](/applications/) and paper for more details.

### Cite Accessbility for Whom
```
@inproceedings{10.1145/3706598.3713421,
author = {Li, Chu and Pang, Yuren Rock and Labbé, Delphine and Eisenberg, Yochai and Hosseini, Maryam and Froehlich, Jon E.},
title = {Accessibility for Whom? Perceptions of Mobility Barriers Across Disability Groups and Implications for Designing Personalized Maps},
year = {2025},
isbn = {9798400703300},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3706598.3713421},
doi = {10.1145/3706598.3713421},
booktitle = {Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems},
articleno = {643},
numpages = {21},
keywords = {accessibility, online image survey, mapping tools, urban planning},
location = {Yokohama, Japan},
series = {CHI '25}
}
```