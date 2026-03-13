import { GameBoard } from "@/components/game-board";

export const metadata = {
  title: "Play - Kyrgyz Memory",
  description:
    "Play the Kyrgyz Memory card game and test your memory while learning about Kyrgyz culture.",
};

export default function GamePage() {
  return <GameBoard />;
}
