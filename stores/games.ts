import { defineStore } from "pinia";

export interface Game {
  gameId: number;
}

export interface Player {
  id: number;
  name: string;
}

export interface Activity {
  id: number;
  gameId: number;
  team: string;
  player: Player;
  action: string;
  score: number;
}

export const useGamesStore = defineStore("games", {
  state: () => ({
    players: [] as Player[],
    activitys: [] as Activity[],
    currentGame: { gameId: 0 } as Game,
    currentTeamA: [] as Player[],
    currentTeamB: [] as Player[],
  }),
  getters: {
    getAvailablePlayers:
      (state: { players: any[]; currentTeamA: any[]; currentTeamB: any[] }) =>
      () => {
        return state.players.filter((player) => {
          return (
            state.currentTeamA.findIndex((key) => key.id === player.id) < 0 &&
            state.currentTeamB.findIndex((key) => key.id === player.id) < 0
          );
        });
      },
    // getPlayerByName: (state: { players: any[] }) => (name: string) => {
    //   return state.players.find((player) => player.name === name);
    // },
  },
  actions: {
    //
    // Game //
    //
    newGame() {
      this.currentGame.gameId++;
    },
    endGame() {},
    resetAllGames() {
      this.currentGame.gameId = 0;
    },
    //
    // Player //
    //
    addPlayer(player: Player) {
      this.players.push(player);
    },
    removePlayer(id: number) {
      const index = this.players.findIndex((key) => key.id === id);
      this.players.splice(index, 1);
    },
    //
    // currentTeam //
    //
    addPlayerToTeam(team: string, player: Player) {
      if (team === "A") this.currentTeamA.push(player);
      else if (team === "B") this.currentTeamB.push(player);
    },
    removePlayerFromTeam(team: string, id: number) {
      if (team === "A") {
        const index = this.currentTeamA.findIndex((key) => key.id === id);
        this.currentTeamA.splice(index, 1);
      } else if (team === "B") {
        const index = this.currentTeamB.findIndex((key) => key.id === id);
        this.currentTeamB.splice(index, 1);
      }
    },
    //
    // Activity //
    //
    addActivity(activity: Activity) {
      this.activitys.push(activity);
    },
    removeActivity(id: number) {
      const index = this.activitys.findIndex((key) => key.id === id);
      this.activitys.splice(index, 1);
    },
  },
  persist: true,
});
