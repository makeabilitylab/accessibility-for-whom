###
### Image Selection Analysis
###


library(plyr)
library(multpois)
library(lme4)
library(lmerTest)
library(car)
library(emmeans)

df <- read.csv("image_selection.csv")
View(df)

df$PId = factor(df$PId)
df$MobilityAid = factor(df$MobilityAid)
df$ImageType = factor(df$ImageType)
df$ImageID = factor(df$ImageID)
df$Selection = factor(df$Selection)

contrasts(df$MobilityAid) <- "contr.sum"
contrasts(df$ImageType) <- "contr.sum"

mosaicplot( ~ MobilityAid + ImageType  + Selection, data=df, main="MY DATA", col=c("pink","orange","lightgreen"))


#overall
m= glmer.mp(Selection ~ MobilityAid*ImageType + (1|PId) +(1|ImageType:ImageID), data=df, control=glmerControl(optimizer="bobyqa", optCtrl=list(maxfun=100000)))
Anova.mp(m)

#pairwise
result <- as.data.frame (glmer.mp.con(m, pairwise ~ MobilityAid*ImageType, adjust="none", 
                                       control=glmerControl(optimizer="bobyqa", optCtrl=list(maxfun=100000))))
View(result)

write.csv(result, "glmer_mp_pairwise_overall.csv")

values <- c(0.0,
             0.618623,
             0.508584,
             0.086928,
             0.674659,
             0.792793,
             0.077504,
             3e-06,
             0.892129,
             0.043824,
             0.446095,
             0.0,
             0.043441,
             0.090082,
             0.523946,
             0.002165,
             0.0,
             0.030642,
             0.000583,
             0.275339,
             0.008509,
             0.000161,
             0.204915,
             0.931808,
             6e-06,
             0.387862,
             0.860205,
             0.012673,
             0.607284,
             0.04175,
             0.019131,
             0.0,
             0.628712,
             0.0,
             0.090649,
             0.021876,
             0.103613,
             0.027872,
             0.0,
             0.000908)
p.adjust(values, method ="holm")



glmer.mp.con(m, pairwise ~ MobilityAid, adjust="holm", control=glmerControl(optimizer="bobyqa", optCtrl=list(maxfun=100000)))
