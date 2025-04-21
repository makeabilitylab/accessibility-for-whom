###
### Image Comparison Analysis
###

#### LMM: DV is Q-score (continuous)----

library(lme4)
library(lmerTest)
library(car)
library(emmeans)
library(performance)
library(plyr) 
library(ggplot2)

df <- read.csv("image_comparison.csv")
View(df)

df$MobilityAid = factor(df$MobilityAid)
df$ImageID = factor(df$ImageID)
df$ImageSet = factor(df$ImageSet)
contrasts(df$MobilityAid) <- "contr.sum"

#boxplot
ggplot(df, aes(x = ImageSet, y = Q, fill = MobilityAid)) +
  geom_boxplot() +
  theme_bw() +
  labs(title = "Q Scores by Mobility Aid and Image Set",
       x = "Mobility Aid Type",
       y = "Q Score") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

#models
m1 = lmer(Q ~ MobilityAid + (1|ImageID), data=df)
m2 = lmer(Q ~ MobilityAid + (1|ImageID) + (1|ImageSet), data=df)
m3 = lmer(Q ~ MobilityAid + (1|ImageSet:ImageID), data=df)

#normality test
r = residuals(m1)
plot(r[1:length(r)]); abline(h=0) # look random? YES!
hist(r) # look normal? YES!
qqnorm(r);qqline(r) # fall near line? YES!
shapiro.test(r) # want p>=.05 YES! p-value = 0.5349
#p-value is the same for m1/m2/m3

# homoscedasticity test
print(check_homogeneity(m3)) # want p>=.05 YES!  p = 0.382

# ANOVA
Anova(m1, type=3, test.statistic="F") # do also for m2, m3
emmeans(m1, pairwise ~ MobilityAid, adjust="holm") # do also m2, m3

#### CLMM (mixed-effects ordinal logistic regression): DV is ranks (ordinal) ----

library(ordinal)
library(RVAideMemoire)
df <- read.csv("image_comparison.csv")
df$Rank = ordered(df$Rank) # D.V.
df$MobilityAid = factor(df$MobilityAid)
df$ImageID = factor(df$ImageID)
df$ImageSet = factor(df$ImageSet)
contrasts(df$MobilityAid) <- "contr.sum"

df2 <- as.data.frame(df)
m = clmm(Rank ~ MobilityAid + (1|ImageID), data=df2, Hess=TRUE, link="logit") # you can try probit
Anova.clmm(m)
emmeans(m, pairwise ~ MobilityAid, adjust="none")
