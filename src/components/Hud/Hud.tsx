import React, { FC } from "react";
import AiTeamHud from "./AITeamHud/AITeamHud";
import PlayerTeamHud from "./PlayerTeamHud/PlayerTeamHud";
import { HudWrapper } from "./Hud.styled";

interface HudProps {
  health: { aiHealth: number; playerHealth: number };
}

const Hud: FC<HudProps> = ({ health }) => (
  <HudWrapper data-testid="Hud">
    <PlayerTeamHud currentHealth={health.playerHealth} />
    <AiTeamHud currentHealth={health.aiHealth} />
  </HudWrapper>
);

export default Hud;
