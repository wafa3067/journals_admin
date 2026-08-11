"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { useRouter } from "next/navigation";
import { checkToken, logout } from "@/app/api/slice/tokenCheck";

const TokenChecker = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { loading } = useAppSelector((state) => state.authToken);

  useEffect(() => {
    dispatch(checkToken())
      .unwrap()
      .catch(() => {
        dispatch(logout());
        router.push("/");
      });
  }, [dispatch, router]);

  if (loading) return <p>Checking token...</p>;
  return null;
};

export default TokenChecker;
