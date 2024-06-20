import { useState, useEffect } from "react";
import {
	getFirestore,
	collection,
	query,
	where,
	onSnapshot,
	deleteDoc,
	doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Home = () => {
	const [games, setGames] = useState([]);
	const db = getFirestore();
	const auth = getAuth();

	useEffect(() => {
		const user = auth.currentUser;
		if (user) {
			const q = query(collection(db, "games"), where("userId", "==", user.uid));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const gamesData = [];
				querySnapshot.forEach((doc) => {
					gamesData.push({ id: doc.id, ...doc.data() });
				});
				setGames(gamesData);
			});
			return () => unsubscribe();
		}
	}, [auth]);

	const handleDelete = async (id) => {
		try {
			await deleteDoc(doc(db, "games", id));
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div>
			<h1>Games</h1>
			<ul>
				{games.map((game) => (
					<li key={game.id}>
						<h2>{game.date}</h2>
						<ul>
							{game.players.map((player, index) => (
								<li key={index}>
									{player.name}: {player.score} points
								</li>
							))}
						</ul>
						<button onClick={() => handleDelete(game.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
