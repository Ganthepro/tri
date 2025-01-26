import { useState } from 'react';
import { HelpCircle, Globe } from 'lucide-react';

const TriangleCalculator = () => {
  const [sides, setSides] = useState({ side1: '', side2: '', side3: '' });
  const [result, setResult] = useState(null);

  const classifyTriangle = (a, b, c) => {
    const sides = [Number(a), Number(b), Number(c)].sort((x, y) => x - y);
    const [s1, s2, s3] = sides;
    if (s1 + s2 <= s3) return null;
    const isRight = Math.abs(s1 * s1 + s2 * s2 - s3 * s3) < 0.000001;
    if (isRight) return 'Right triangle';
    if (s1 === s2 && s2 === s3) return 'Equilateral triangle';
    if (s1 === s2 || s2 === s3) return 'Isosceles triangle';
    return 'Scalene triangle';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const classification = classifyTriangle(sides.side1, sides.side2, sides.side3);
    setResult(classification);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800 p-4 md:p-8 ">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-white rounded-lg px-2 py-1 md:px-4 md:py-2 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 md:w-6 md:h-6 text-black" />
          <span className="text-black text-sm md:text-lg">How to use?</span>
        </div>
        <div className="bg-white rounded-lg px-2 py-1 md:px-4 md:py-2 flex items-center gap-2">
          <Globe className="w-4 h-4 md:w-6 md:h-6 text-black" />
          <select className="bg-white text-black text-sm md:text-lg outline-none">
            <option>English</option>
          </select>
        </div>
      </div>
      
      <h1 className="text-3xl md:text-6xl text-white text-center mb-6 underline">
        Classifying Triangle
      </h1>
      
      <div className="flex flex-col md:flex-row gap-4 mx-2 md:mx-8 ">
        <div className="flex-1 bg-white rounded-lg flex flex-col items-center p-4 md:p-8">
          <h2 className="text-4xl text-center font-bold mb-8">Enter length of sides</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-12 flex flex-col flex-grow justify-center">
            {[1, 2, 3].map(num => (
              <div key={num} className="flex flex-col items-center md:flex-row  md:items-center gap-2 md:gap-8 w-full">
                <label className="text-xl  md:text-2xl min-w-[100px]">Side {num}</label>
                <input
                  type="number"
                  value={sides[`side${num}`]}
                  onChange={(e) => setSides({
                    ...sides,
                    [`side${num}`]: e.target.value
                  })}
                  className="border rounded px-4 py-3 w-full text-xl"
                />
              </div>
            ))}
            <div className="flex justify-center">
              <button 
                type="submit"
                className="bg-black text-white px-12 py-3 rounded text-xl min-w-[200px]"
              >
                Enter
              </button>
            </div>
          </form>
        </div>

        <div className="flex-1 bg-white rounded-lg p-4 md:p-8">
          <h2 className="text-4xl text-center font-bold mb-8">Result</h2>
          {result=='Right triangle' ?(
            <div className="flex flex-col items-center justify-center h-[calc(100%-100px)]">
              <svg viewBox="0 0 110 110" className="w-32 md:w-40 mb-8">
                <path 
                  d="M20,90 L110,90 L20,20 Z" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="2"
                />
                <text x="55" y="105" fontSize="12">{sides.side2}</text>
                <text x="65" y="50" fontSize="12">{sides.side3}</text>
                <text x="0" y="60" fontSize="12">{sides.side1}</text>
              </svg>
              <div className="text-center">
                <p className="text-2xl font-bold mb-4">{result}</p>
                <p className="text-base md:text-lg">
                    Right triangle is a triangle with one angle that measures 90 degrees. The other two angles sum up to 90 degrees.
                </p>
              </div>
            </div>
          ):result=='Equilateral triangle' ?(
            <div className="flex flex-col items-center justify-center h-[calc(100%-100px)]">
              <svg viewBox="0 0 110 110" className="w-32 md:w-40 mb-8">
                <path 
                  d="M15,90 L95,90 L55,20 Z" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="2"
                />
                <text x="55" y="105" fontSize="12">{sides.side2}</text>
                <text x="80" y="60" fontSize="12">{sides.side3}</text>
                <text x="20" y="60" fontSize="12">{sides.side1}</text>
              </svg>
              <div className="text-center">
                <p className="text-2xl font-bold mb-4">{result}</p>
                <p className="text-base md:text-lg">
                A triangle with three equal sides and three equal 60-degree angles. All sides and angles are congruent.
                </p>
              </div>
            </div>
          ):result=='Isosceles triangle' ?(
            <div className="flex flex-col items-center justify-center h-[calc(100%-100px)]">
              <svg viewBox="0 0 110 110" className="w-32 md:w-40 mb-8">
                <path 
                  d="M20,90 L90,90 L55,20 Z" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="2"
                />
                <text x="55" y="105" fontSize="12">{sides.side2}</text>
                <text x="80" y="60" fontSize="12">{sides.side3}</text>
                <text x="20" y="60" fontSize="12">{sides.side1}</text>
              </svg>
              <div className="text-center">
                <p className="text-2xl font-bold mb-4">{result}</p>
                <p className="text-base md:text-lg">
                A triangle with two equal sides and two equal angles. Two sides and their opposite angles are congruent.
                </p>
              </div>
            </div>
          ):result=='Scalene triangle' ?(
            <div className="flex flex-col items-center justify-center h-[calc(100%-100px)]">
              <svg viewBox="0 0 110 110" className="w-32 md:w-40 mb-8">
                <path 
                  d="M40,90 L110,90 L20,20 Z" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="2"
                />
                <text x="65" y="105" fontSize="12">{sides.side2}</text>
                <text x="65" y="50" fontSize="12">{sides.side3}</text>
                <text x="0" y="60" fontSize="12">{sides.side1}</text>
              </svg>
              <div className="text-center">
                <p className="text-2xl font-bold mb-4">{result}</p>
                <p className="text-base md:text-lg">
                A triangle with three unequal sides and three different angle measurements. No sides or angles are alike.
                </p>
              </div>
            </div>
          ):(
            <div className="flex flex-col items-center justify-center h-[calc(100%-100px)]">
              <div className="text-center">
                <p className="text-2xl font-bold mb-4">ERROR</p>
              </div>
            </div>
          )
        }
        </div>
      </div>
    </div>
  );
};

export default TriangleCalculator;