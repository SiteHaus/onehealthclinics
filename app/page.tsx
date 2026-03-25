"use client";

import { Button } from "@/components/ui/button";
import { Banner } from "@/components/shared/banner";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Bolt } from "lucide-react";
export default function Home() {
  const router = useRouter();
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex h-[calc(100vh-80px)] bg-[url('/office.jpg')] bg-cover bg-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative w-full lg:w-1/2 bg-gradient-to-r from-black/60 via-black/40 to-transparent">
          <div className="flex items-center h-full justify-center px-6">
            <div className="flex flex-col text-background max-w-xl">
              <span className="text-4xl md:text-5xl lg:text-6xl font-semibold">
                Care you
              </span>

              <span className="text-4xl md:text-5xl lg:text-6xl font-semibold text-subtext">
                Can count on
              </span>

              <p className="mt-6 text-base md:text-lg">
                From same-day sick visits to long-term wellness plans, One
                Health provides warm, personalized healthcare for every member
                of your family — right here in Southern Utah.
              </p>

              <Button
                onClick={() => router.push("/contact")}
                className="w-fit mt-6 px-6 py-4 rounded-xl"
              >
                Book with Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Section BELOW hero */}
      <section>
        <Banner
          className="text-md lg:text-lg bg-primary text-secondary text-center"
          content={"- Dixie Primary Care is now One Health! -"}
        />
      </section>
      <div className="bg-white ">
        <section className="bg-cover bg-center bg-no-repeat w-full py-24 ">
          <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-12 px-6">
            <div className="w-full lg:w-1/2">
              <h2 className="text-sm font-semibold text-primary">
                EST. 2006 | ST GEORGE, UTAH
              </h2>

              <h1 className="font-bold mt-4 text-4xl md:text-5xl lg:text-6xl">
                An Evolution of Care, Two Decades in the Making
              </h1>
            </div>

            <div className="w-full lg:w-1/2 text-muted-foreground font-semibold text-lg text-center md:text-xl">
              <p className="pb-10">
                Since 2006, our mission has been to provide a unique blend of
                internal medicine and personalized attention. For 20 years,
                we've had the privilege of being your medical home as Dixie
                Primary Care.
              </p>

              <p>
                As our community grew, so did our scope. We've evolved far
                beyond a traditional primary care office — managing complex
                chronic conditions, performing specialized procedures, and
                offering wellness care for every stage of life.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-cover bg-center bg-no-repeat w-full py-5 lg:py-10">
          <div className="flex flex-col max-w-6xl mx-auto gap-12 px-6">
            {/* Title */}
            <div className="w-full text-center">
              <h2 className="text-sm font-semibold text-primary">
                OUR PHILOSOPHY
              </h2>

              <h1 className="font-bold mt-4 text-4xl md:text-5xl lg:text-6xl">
                Why One Health?
              </h1>
            </div>

            {/* Cards */}
            <div className="flex flex-col md:flex-row justify-center items-center lg:items-stretch gap-10 mt-12">
              <Card className="w-[280px] bg-[#D9D9D9] h-full flex flex-col bg-white rounded-lg border border-border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bolt className="text-primary" />
                  </div>
                  <CardTitle className="text-primary">
                    All-in-one care
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-muted-foreground leading-relaxed">
                    Primary care, specialized wellness, and functional medicine
                    — integrated in one place.
                  </p>
                </CardContent>
              </Card>
              <Card className="w-[280px] bg-[#D9D9D9] h-full flex flex-col bg-white rounded-lg border border-border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bolt className="text-primary" />
                  </div>
                  <CardTitle className="text-primary">
                    Your medical home
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-muted-foreground leading-relaxed">
                    Primary care, specialized wellness, and functional medicine
                    — integrated in one place.
                  </p>
                </CardContent>
              </Card>
              <Card className="w-[280px] bg-[#D9D9D9] h-full flex flex-col bg-white rounded-lg border border-border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bolt className="text-primary" />
                  </div>
                  <CardTitle className="text-primary">
                    Built for growth
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-muted-foreground leading-relaxed">
                    Evolved to meet the complexity of modern health needs across
                    every stage of life.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
