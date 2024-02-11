import { defineStore } from "pinia";

export interface Player {
  id: number;
  name: string;
}

export interface Activity {
  gameId: number;
  team: string;
  playerId: number;
  action: string;
  score: number;
}

export const usePlayersStore = defineStore("players", {
  state: () => ({
    players: [] as Player[],
    activitys: [] as Activity[],
    currentGameId: Number,
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
    getPlayerByName: (state: { players: any[] }) => (name: string) => {
      return state.players.find((player) => player.name === name);
    },
  },
  actions: {
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
  },
  persist: true,
});
