import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";

const NewGame = () => {
	const [players, setPlayers] = useState([{ name: "", score: 0 }]);
	const db = getFirestore();
	const auth = getAuth();
	const router = useRouter();

	const handleAddPlayer = () => {
		setPlayers([...players, { name: "", score: 0 }]);
	};

	const handlePlayerChange = (index, field, value) => {
		const newPlayers = [...players];
		newPlayers[index][field] = value;
		setPlayers(newPlayers);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const user = auth.currentUser;
			if (!user) throw new Error("User not authenticated");

			const gameData = {
				userId: user.uid,
				players,
				date: new Date().toISOString(),
			};

			await addDoc(collection(db, "games"), gameData);
			router.push("/");
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			{players.map((player, index) => (
				<div key={index}>
					<input
						type="text"
						value={player.name}
						onChange={(e) => handlePlayerChange(index, "name", e.target.value)}
						placeholder="Player Name"
						required
					/>
					<input
						type="number"
						value={player.score}
						onChange={(e) => handlePlayerChange(index, "score", e.target.value)}
						placeholder="Player Score"
						required
					/>
				</div>
			))}
			<button type="button" onClick={handleAddPlayer}>
				Add Player
			</button>
			<button type="submit">Save Game</button>
		</form>
	);
};

export default NewGame;
