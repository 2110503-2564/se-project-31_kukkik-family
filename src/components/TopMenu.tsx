"use client";
import styles from "./topmenu.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopMenu() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className={styles.menucontainer}>
      <div className="flex items-center">
        <Link href="/" prefetch={true}>
          <Image
            src={"/img/logo.png"}
            className={styles.logoimg}
            alt="logo"
            width={0}
            height={0}
            sizes="100vh"
          />
        </Link>
        <Link
          href="/"
          prefetch={true}
          className={`${styles.itemcontainer} ${
            pathname === "/" ? styles.active : ""
          }`}
        >
          Home
        </Link>
      </div>
      <div className="flex items-center space-x-4 absolute right-0 h-full px-8">
        {session?.user?.role === "renter" ? (
          <>
            <Link
              href="/renter/addrentalcar"
              prefetch={true}
              className={`${styles.itemcontainer} ${
                pathname === "/renter/addrentalcar" ? styles.active : ""
              }`}
            >
              Add Rental Car
            </Link>
            <Link
              href="/api/auth/signout"
              prefetch={true}
              className={styles.itemcontainer}
            >
              Sign-Out of {session.user?.name}
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/cars"
              prefetch={true}
              className={`${styles.itemcontainer} ${
                pathname === "/cars" ? styles.active : ""
              }`}
            >
              Products
            </Link>

            {session ? (
              <>
                <Link
                  href="/wallet"
                  prefetch={true}
                  className={`${styles.itemcontainer} ${pathname === "/wallet" ? styles.active : ""
                    }`}
                >
                  Wallet
                </Link>
                <Link
                  href="/booking"
                  prefetch={true}
                  className={`${styles.itemcontainer} ${
                    pathname === "/booking" ? styles.active : ""
                  }`}
                >
                  Book
                </Link>
                <Link
                  href="/mybooking"
                  prefetch={true}
                  className={`${styles.itemcontainer} ${
                    pathname === "/mybooking" ? styles.active : ""
                  }`}
                >
                  All Bookings
                </Link>
                <Link
                  href="/api/auth/signout"
                  prefetch={true}
                  className={styles.itemcontainer}
                >
                  Sign-Out of {session.user?.name}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/signin"
                  prefetch={true}
                  className={`${styles.itemcontainer} ${
                    pathname === "/login" ? styles.active : ""
                  }`}
                >
                  Sign-In
                </Link>
                <Link
                  href="/register"
                  prefetch={true}
                  className={`${styles.itemcontainer} ${
                    pathname === "/register" ? styles.active : ""
                  }`}
                >
                  Sign-Up
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
