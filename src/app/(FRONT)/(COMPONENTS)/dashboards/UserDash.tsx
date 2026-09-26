import React from 'react';
import HeroSection from '@/app/(FRONT)/(COMPONENTS)/HeroSection';
import CategorySlider from '@/app/(FRONT)/(COMPONENTS)/CategorySlider';
import MealCard from "@/app/(FRONT)/(COMPONENTS)/MealCard";
import connectDb from "@/app/(BACK)/config/db";
import Meal from "@/app/(BACK)/models/meal.model";


async function UserDash() {
    await connectDb();
    const meals = await Meal.find({}).lean();
    const serializedMeals = meals.map(meal => ({
        ...meal,
        _id: meal._id.toString(),
    }));
    return (
        <div className="relative pb-20">
            <HeroSection />
            <CategorySlider />
            <section className="mx-auto w-[96%] max-w-7xl px-1 lg:max-w-350">
                <div className="mb-6 flex items-end justify-between">
                    <div>
                        <p className="mb-1 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">Tonight&apos;s menu</p>
                        <h2 className="font-serif text-2xl italic md:text-3xl">Popular near you</h2>
                    </div>
                    <span className="hidden text-xs text-muted-foreground sm:block">{serializedMeals.length} dishes</span>
                </div>
                <MealCard meals={serializedMeals} />
            </section>
        </div>
    );
}

export default UserDash;