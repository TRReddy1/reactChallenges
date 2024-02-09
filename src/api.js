import axios from "axios";
export const githubUsers = async (name) => {
  //   const result = await axios
  //     .get(`https://api.github.com/search/users?per_page=5&q=${name}`)
  //     .then((res) => res.data)
  //     .catch((err) => console.log(err));
  //   return result.items;
  const result = { items: [], errorMsgFromApi: "", timeDelta: 0 };

  try {
    const response = await fetch(
      `https://api.github.com/search/users?per_page=5&q=${name}`
    );

    // The GitHub API responds with http 403 Forbidden when the rate limit is exceeded.
    if (response.status === 403) {
      // The API suspends further requests until a specified time. This specified time is included in the
      // response header under the key "x-ratelimit-reset"
      // https://docs.github.com/en/rest/guides/best-practices-for-using-the-rest-api?apiVersion=2022-11-28#handle-rate-limit-errors-appropriately
      const timeOfLimitReset = response.headers.get("x-ratelimit-reset");

      if (timeOfLimitReset !== null) {
        const timeValue = parseFloat(timeOfLimitReset);

        // Following line of code will calculate the number of seconds between the time at which the rate-limit was
        // breached and the time at which we can start making requests again.
        result.timeDelta = Math.ceil(timeValue - Date.now() / 1000);
      } else {
        // Set timeDelta to 60 seconds if the "x-ratelimit-reset" header is not present or changes in the future
        result.timeDelta = 60;
      }
    } else {
      const data = await response.json();
      result.items = data.items.map((item) => item.login);
    }

    return result;
  } catch (e) {
    result.errorMsgFromApi = "Error occurred while fetching suggestions";
    return result;
  }
};
