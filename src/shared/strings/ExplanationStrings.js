export default {
  articleHandler : {
    scrollDepth: 'Percentage of the article the user has scrolled through. This is based on the height of the article rather then the height of the page, so the comments section is excluded.',
  },
  navBar : {
    alpha: `Lantern is currently in an alpha state and is not a live system.
    The data used does not represent the live FT.com.
    There will be ongoing changes, without warning,
    to both the data and the interface,
    as development continues.`
  },
  sectionModifier: {
    articles: "When you select a Tag, Lantern will compare this article against all other articles with the same Tag; only those articles published in the 30 days before this article's publication date are included",
    sections: "When you select a Tag, Lantern will compare this section against that tag for the selected time period.",
    topics: "When you select a Tag, Lantern will compare this topic against that tag for the selected time period."
  },
  sectionWho : {
    rfv: `<b>FT Super Fans:</b> read 3.5 articles and visit us twice a day on average.
<b>FT Fans:</b> read 9 articles and visit us 4 times per week on average.
<b>Engaged, Frequent & Free:</b> read 2.6 articles and visit us 6 times per week on average.
<b>Borderline Engaged:</b> mainly B2B and registered users. Read 2 articles and visit us twice a week on average.
<b>Half Engaged:</b> even split of subscribers and registered users. Read 4 articles and visit us 3 times per month on average.
<b>Occasional Skimmers:</b> mainly registered or B2B users. Read 2.4 articles and visit us 4 times per 90 days on average.
<b>Disengaged Long Tail:</b> mainly registered or B2B users. Read 2 articles and visit us 2.6 times per 90 day period on average.`,
  },
  sectionWhen : {
    articleViews: `This chart shows page views over time for this article (blue)
    and average page views for the articles in the selected tag (orange).
    The time scale (horizontal axis) shows time since publication`,
  },
  sectionNext : {
    bounceRate: "Bounce rate is the number of users that exited the FT after only reading this article",
  },
  sectionInteract : {
    socialShares: 'This is the number of times the article has been shared using the share buttons on ft.com',
    commentsViewed: 'This shows the number of users who read down to the comment section of the article page'
  }
}
