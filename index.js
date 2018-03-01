"use strict";

var Trigger = global.TriggerClass;
const Twit = require("twit");

class triggerTwitter extends Trigger {
  constructor(chain, params) {
    super(chain, params);
  }

  start() {
    let _this = this;

    // Twitter API access:
    var T = new Twit({
      consumer_key: _this.params.config.consumerKey,
      consumer_secret: _this.params.config.consumerSecret,
      access_token: _this.params.config.accessToken,
      access_token_secret: _this.params.config.accessTokenSecret,
      timeout_ms: _this.params.config.timeoutMs,  // optional HTTP request timeout to apply to all requests.
    });

    // Callback
    switch (_this.params.command) {
      case "follow":
        this.stream = T.stream("user");
        _this.stream.on("follow", function (eventMsg) {
          const checkCalendar = true;
          const inputValues = {
            "user_id": eventMsg.source.id,
            "user_id_str": eventMsg.source.id_str,
            "user_name": eventMsg.source.name,
            "user_screen_name": eventMsg.source.screen_name,
            "user_location": eventMsg.source.location,
            "user_description": eventMsg.source.description,
            "user_followers_count": eventMsg.source.followers_count,
            "user_friends_count": eventMsg.source.friends_count,
            "user_listed_count": eventMsg.source.listed_count,
            "user_favourites_count": eventMsg.source.favourites_count,
            "user_statuses_count": eventMsg.source.statuses_count,
            "user_lang": eventMsg.source.lang,
            "user_profile_background_image_url": eventMsg.source.profile_background_image_url,
            "user_profile_image_url": eventMsg.source.profile_image_url,
            "user_following": eventMsg.source.following,
            "user_follow_request_sent": eventMsg.source.follow_request_sent,
            "tweet_data": eventMsg
          };
          const customValues = {};

          _this.startChain(checkCalendar, inputValues, customValues)
            .then(() => { })
            .catch(err => {
              _this.logger.error("startChain error (triggerTwitter):", err);
            });
        });
        break;

      case "hashtag":
        _this.stream = T.stream("statuses/filter", { track: _this.params.hashtag, language: "es" });
        _this.stream.on("tweet", function (tweet) {
          const checkCalendar = true;
          const inputValues = {
            "user_id": tweet.user.id,
            "user_id_str": tweet.user.id_str,
            "user_name": tweet.user.name,
            "user_screen_name": tweet.user.screen_name,
            "user_location": tweet.user.location,
            "user_description": tweet.user.description,
            "user_followers_count": tweet.user.followers_count,
            "user_friends_count": tweet.user.friends_count,
            "user_listed_count": tweet.user.listed_count,
            "user_favourites_count": tweet.user.favourites_count,
            "user_statuses_count": tweet.user.statuses_count,
            "user_lang": tweet.user.lang,
            "user_profile_background_image_url": tweet.user.profile_background_image_url,
            "user_profile_image_url": tweet.user.profile_image_url,
            "user_following": tweet.user.following,
            "user_follow_request_sent": tweet.user.follow_request_sent,
            "tweet_created_at": tweet.created_at,
            "tweet_id": tweet.id,
            "tweet_id_str": tweet.id_str,
            "tweet_text": tweet.text,
            "tweet_retweet_count": tweet.retweet_count,
            "tweet_favorite_count": tweet.favorite_count,
            "tweet_hashtags": tweet.entities.hashtags,
            "tweet_data": tweet
          };
          const customValues = {};

          _this.startChain(checkCalendar, inputValues, customValues)
            .then(() => { })
            .catch(err => {
              _this.logger.error("startChain error (triggerTwitter):", err);
            });
        });
        break;
    }
  }
}

module.exports = triggerTwitter;
