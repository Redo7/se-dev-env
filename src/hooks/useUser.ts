function useUser(){
	const name = "TestUser"
	const avatar = "https://a.ppy.sh/2460045?1365236350.jpg"
	const role = "user"
	const provider = "twitch"
  return {
    user: {
      name,
      avatar,
      role,
      provider,
    },
  };
}
export default useUser