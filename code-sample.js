export default `
query Example($limit: Int) {
  launchesPast(limit: $limit) {
    mission_name
    # format me using the right click context menu
              launch_date_local
    launch_site {
      site_name_long
    }
    links {
      article_link
      video_link
    }
  }
}
`
