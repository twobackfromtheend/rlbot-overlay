export interface GameState {
  game_cars: PlayerInfo[];
  game_ball: GameBall;
  game_info: GameInfo;
  teams: Team[];
}

export interface PlayerInfo {
  location: Vector3;
  is_demolished: boolean;
  has_wheel_contact: boolean;
  is_supersonic: boolean;
  is_bot: boolean;
  name: string;
  team: number;
  boost: number;
  score_info: ScoreInfo;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface ScoreInfo {
  score: number;
  goals: number;
  own_goals: number;
  assists: number;
  saves: number;
  shots: number;
  demolitions: number;
}

export interface GameBall {
  location: Vector3;
  latest_touch: LatestTouch;
}

export interface LatestTouch {
  player_name: string;
  time_seconds: number;
  hit_location: Vector3;
  team: number;
  player_index: number;
}

export interface GameInfo {
  seconds_elapsed: number;
  game_time_remaining: number;
  is_overtime: boolean;
  is_unlimited_time: boolean;
  is_round_active: boolean;
  is_kickoff_pause: boolean;
  is_match_ended: boolean;
  frame_num: number;
}

export interface Team {
  team_index: number;
  score: number;
}
