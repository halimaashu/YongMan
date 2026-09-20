'use client'
import React, { useState, useEffect } from 'react';
// Gravity UI Icons Import
import { 
  Person, 
  PersonFill, 
  ScalesBalanced, 
  ArrowDown, 
  CircleInfo, 
  Flame, 
  Activity, 
  ChartAreaStacked,
  Target
} from '@gravity-ui/icons';

export default function BmiCalculator() {
  // 1. Core Inputs State
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(65); // In kg
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(5);
  
  // 2. Calorie Specific Inputs State
  const [activity, setActivity] = useState('sedentary');
  const [goal, setGoal] = useState('maintain');

  // 3. Calculation Outputs State
  const [bmi, setBmi] = useState(0);
  const [bmiStatus, setBmiStatus] = useState('');
  const [bmiColor, setBmiColor] = useState('');
  const [dailyCalories, setDailyCalories] = useState(0);

  // 4. Food Macro State (Grams of Protein, Carbs, Fats)
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);

  // Real-time Calculation Logic
  useEffect(() => {
    const totalInches = (heightFeet * 12) + Number(heightInches);
    const heightInMeters = totalInches * 0.0254;
    const heightInCm = totalInches * 2.54;

    if (heightInMeters > 0 && weight > 0) {
      // --- BMI Calculation ---
      const calculatedBmi = weight / (heightInMeters * heightInMeters);
      const roundedBmi = parseFloat(calculatedBmi.toFixed(1));
      setBmi(roundedBmi);

      if (age >= 18) {
        if (roundedBmi < 18.5) {
          setBmiStatus('Underweight');
          setBmiColor('text-amber-400 bg-amber-950/20 border-amber-900/50');
        } else if (roundedBmi >= 18.5 && roundedBmi <= 24.9) {
          setBmiStatus('Normal');
          setBmiColor('text-emerald-400 bg-emerald-950/20 border-emerald-900/50');
        } else if (roundedBmi >= 25 && roundedBmi <= 29.9) {
          setBmiStatus('Overweight');
          setBmiColor('text-orange-400 bg-orange-950/20 border-orange-900/50');
        } else {
          setBmiStatus('Obese');
          setBmiColor('text-rose-400 bg-rose-950/20 border-rose-900/50');
        }
      } else {
        if (roundedBmi < 15) {
          setBmiStatus('Underweight (Child)');
          setBmiColor('text-amber-400 bg-amber-950/20 border-amber-900/50');
        } else if (roundedBmi >= 15 && roundedBmi <= 22) {
          setBmiStatus('Normal (Child)');
          setBmiColor('text-emerald-400 bg-emerald-950/20 border-emerald-900/50');
        } else {
          setBmiStatus('Overweight (Child)');
          setBmiColor('text-rose-400 bg-rose-950/20 border-rose-900/50');
        }
      }

      // --- Calorie Calculation (Mifflin-St Jeor) ---
      let bmr = 0;
      if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * heightInCm) - (5 * age) + 5;
      } else {
        bmr = (10 * weight) + (6.25 * heightInCm) - (5 * age) - 161;
      }

      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725
      };
      
      const tdee = bmr * activityMultipliers[activity];

      let targetCalories = tdee;
      if (goal === 'lose') targetCalories = tdee - 500;
      if (goal === 'gain') targetCalories = tdee + 500;

      const finalCalories = Math.round(targetCalories);
      setDailyCalories(finalCalories);

      // --- Food Macro Split Logic (Protein / Carbs / Fats Distribution) ---
      let pRatio = 0.30; // 30% Protein
      let cRatio = 0.40; // 40% Carbs
      let fRatio = 0.30; // 30% Fats

      if (goal === 'lose') {
        pRatio = 0.40; // Higher protein to preserve muscle
        cRatio = 0.35;
        fRatio = 0.25;
      } else if (goal === 'gain') {
        pRatio = 0.30;
        cRatio = 0.50; // Higher carbs for mass building energy
        fRatio = 0.20;
      }

      // 1g Protein = 4 kcal, 1g Carbs = 4 kcal, 1g Fat = 9 kcal
      setProtein(Math.round((finalCalories * pRatio) / 4));
      setCarbs(Math.round((finalCalories * cRatio) / 4));
      setFats(Math.round((finalCalories * fRatio) / 9));
    }
  }, [gender, age, weight, heightFeet, heightInches, activity, goal]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      
     <div className="">
      <span className=" flex  m-5 justify-center items-center font-bold text-center mx-auto text-[#ff551f]">
              . BMI CALCULATOR .
            </span>
       <div className="bg-zinc-900 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-6 border border-zinc-800">
        
        
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white tracking-wide">Fitness & Food Dashboard</h1>
          <p className="text-sm text-zinc-400 mt-1">Real-time body tracking and nutrition split</p>
        </div>

        {/* Gender Selection */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            type="button" onClick={() => setGender('male')}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200 ${gender === 'male' ? 'border-indigo-500 bg-indigo-950/30 text-indigo-400 font-semibold shadow-[0_0_15px_rgba(99,102,241,0.15)]' : 'border-zinc-800 text-zinc-400 hover:bg-zinc-800/50'}`}
          >
            <Person className="w-5 h-5" /> Male
          </button>
          <button 
            type="button" onClick={() => setGender('female')}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200 ${gender === 'female' ? 'border-pink-500 bg-pink-950/30 text-pink-400 font-semibold shadow-[0_0_15px_rgba(244,63,94,0.15)]' : 'border-zinc-800 text-zinc-400 hover:bg-zinc-800/50'}`}
          >
            <PersonFill className="w-5 h-5" /> Female
          </button>
        </div>

        {/* User Input Sliders */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-zinc-300">
              <span className="flex items-center gap-1 text-zinc-400"><CircleInfo className="w-4 h-4" /> Age</span>
              <span className="text-indigo-400 font-bold">{age} yrs</span>
            </div>
            <input type="range" min="2" max="100" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg appearance-none" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-zinc-300">
              <span className="flex items-center gap-1 text-zinc-400"><ScalesBalanced className="w-4 h-4" /> Weight</span>
              <span className="text-indigo-400 font-bold">{weight} kg</span>
            </div>
            <input type="range" min="10" max="150" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg appearance-none" />
          </div>
        </div>

        {/* Height Dropdowns */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300 flex items-center gap-1"><ArrowDown className="w-4 h-4 text-zinc-400" /> Height</label>
          <div className="grid grid-cols-2 gap-4">
            <select value={heightFeet} onChange={(e) => setHeightFeet(Number(e.target.value))} className="p-2.5 border border-zinc-800 rounded-xl text-zinc-200 bg-zinc-950 focus:ring-1 focus:ring-indigo-500 outline-none">
              {[2, 3, 4, 5, 6, 7].map(f => <option key={f} value={f}>{f} ft</option>)}
            </select>
            <select value={heightInches} onChange={(e) => setHeightInches(Number(e.target.value))} className="p-2.5 border border-zinc-800 rounded-xl text-zinc-200 bg-zinc-950 focus:ring-1 focus:ring-indigo-500 outline-none">
              {Array.from({ length: 12 }, (_, i) => i).map(i => <option key={i} value={i}>{i} in</option>)}
            </select>
          </div>
        </div>

        {/* Activity & Goal Settings */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-500 flex items-center gap-1"><ChartAreaStacked className="w-3.5 h-3.5" /> Activity Level</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full p-2.5 border border-zinc-800 rounded-xl text-xs text-zinc-300 bg-zinc-950 focus:ring-1 focus:ring-indigo-500 outline-none">
              <option value="sedentary">Sedentary (Desk Job)</option>
              <option value="light">Lightly Active (1-3 days/wk)</option>
              <option value="moderate">Moderately Active (3-5 days/wk)</option>
              <option value="active">Very Active (6-7 days/wk)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-500 flex items-center gap-1"><Target className="w-3.5 h-3.5" /> Fitness Goal</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full p-2.5 border border-zinc-800 rounded-xl text-xs text-zinc-300 bg-zinc-950 focus:ring-1 focus:ring-indigo-500 outline-none">
              <option value="maintain">Maintain Weight</option>
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Weight</option>
            </select>
          </div>
        </div>

        {/* Core Calculations Display */}
        <div className="pt-4 border-t border-zinc-800/60 grid grid-cols-2 gap-4">
          <div className="bg-zinc-950/80 rounded-2xl p-4 text-center border border-zinc-800 flex flex-col justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">BMI Score</span>
            <h2 className="text-3xl font-black text-indigo-400 my-1 drop-shadow-[0_0_10px_rgba(99,102,241,0.2)]">{bmi}</h2>
            <span className={`text-[10px] font-bold py-1 px-2.5 rounded-full border inline-block mx-auto ${bmiColor}`}>
              {bmiStatus}
            </span>
          </div>

          <div className="bg-zinc-950/80 rounded-2xl p-4 text-center border border-zinc-800 flex flex-col justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center justify-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" /> Daily Target
            </span>
            <h2 className="text-3xl font-black text-orange-400 my-1 drop-shadow-[0_0_10px_rgba(251,146,60,0.2)]">
              {dailyCalories}
            </h2>
            <span className="text-[10px] font-medium text-zinc-500">kcal / day</span>
          </div>
        </div>

        {/* Food Macros Breakdown */}
        <div className="bg-zinc-950/80 rounded-2xl p-4 border border-zinc-800 space-y-3">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block text-center">
            Daily Macro Split
          </span>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-semibold text-sky-400 block">PROTEIN</span>
              <span className="text-lg font-bold text-zinc-100">{protein}g</span>
            </div>
            <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-semibold text-emerald-400 block">CARBS</span>
              <span className="text-lg font-bold text-zinc-100">{carbs}g</span>
            </div>
            <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-semibold text-amber-400 block">FATS</span>
              <span className="text-lg font-bold text-zinc-100">{fats}g</span>
            </div>
          </div>
        </div>

      </div>
     </div>
    </div>
  );
}