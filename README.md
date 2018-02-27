# Twitter Trigger for [Runnerty]:

With this trigger you can stream twitter hashtags and collect the data from the user and the tweet

### Configuration sample:
```json
{
  "id":"twitter_default",
  "type":"@runnerty-trigger-twitter",
  "consumerKey":"123abc",
  "consumerSecret":"123abc",
  "accessToken":"123abc",
  "accessTokenSecret":"123abc"
}
```

### Plan sample:
```json
{
  "id":"twitter_default",
  "hashtag":"#runnerty"
}
```

### Chain input
This trigger sends to the input of the chain data from the tweet which you can use in you plan:

```
user_id: number
user_id_str: number
user_name: string
user_screen_name: string
user_location: string
user_description: string
user_followers_count: number
user_friends_count: number
user_listed_count: number
user_favourites_count: number
user_statuses_count: number
user_lang: string
user_profile_background_image_url: string
user_profile_image_url: string
user_following: boolean
user_follow_request_sent: boolean
tweet_created_at: date
tweet_id: number
tweet_id_str: number
tweet_text: string
tweet_retweet_count: number
tweet_favorite_count: number
tweet_hashtags: object
```

[Runnerty]: http://www.runnerty.io