import React from "react";
import { useSigninCheck } from "reactfire";
import Login from "../components/auth/Login";
import Dashboard from "../components/Dashboard";
import Loading from "../components/Loading";

export default function Home() {
	const { status, data } = useSigninCheck();

	// switch the site based off the auth status
	if (status === "loading") return <Loading />;

	if (data.signedIn === false) return <Login />;

	return <Dashboard />;
}
