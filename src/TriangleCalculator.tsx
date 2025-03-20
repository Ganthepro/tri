import { useState } from 'react';
import { HelpCircle, Globe, X } from 'lucide-react';

const TriangleCalculator = () => {
  const [sides, setSides] = useState({ side1: '', side2: '', side3: '' });
  const [result, setResult] = useState(null);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [language, setLanguage] = useState('english');

  // Translations
  const translations = {
    english: {
      howToUse: 'How to use?',
      classifyingTriangle: 'Classifying Triangle',
      enterLengthOfSides: 'Enter length of sides',
      side: 'Side',
      enter: 'Enter',
      suggestions: 'Suggestions',
      equilateral: 'Equilateral',
      isosceles: 'Isosceles',
      right: 'Right',
      scalene: 'Scalene',
      result: 'Result',
      enterValidTriangleSides: 'Enter valid triangle sides',
      triangleValidityReminder: 'Remember: The sum of the lengths of any two sides must be greater than the length of the remaining side.',
      rightTriangleDescription: 'Right triangle is a triangle with one angle that measures 90 degrees. The other two angles sum up to 90 degrees.',
      equilateralTriangleDescription: 'A triangle with three equal sides and three equal 60-degree angles. All sides and angles are congruent.',
      isoscelesTriangleDescription: 'A triangle with two equal sides and two equal angles. Two sides and their opposite angles are congruent.',
      scaleneTriangleDescription: 'A triangle with three unequal sides and three different angle measurements. No sides or angles are alike.',
      equilateralResult: 'Equilateral triangle',
      isoscelesResult: 'Isosceles triangle',
      rightResult: 'Right triangle',
      scaleneResult: 'Scalene triangle',
      helpTitle: 'How to Use the Triangle Calculator',
      step1: 'Step 1: Enter the triangle sides',
      step1Description: 'Enter the length of each side of your triangle in the corresponding input fields. All values must be positive numbers.',
      step2: 'Step 2: Click "Enter"',
      step2Description: 'After entering all three sides, click the "Enter" button to calculate and classify your triangle.',
      triangleClassifications: 'Triangle Classifications',
      importantNote: 'Important Note',
      validTriangleNote: 'The sides you enter must be able to form a valid triangle. This means the sum of the lengths of any two sides must be greater than the length of the remaining side.',
      errorMessage: 'If your input doesn\'t form a valid triangle, you\'ll see an error message.',
      close: 'Close'
    },
    thai: {
      howToUse: 'วิธีใช้งาน?',
      classifyingTriangle: 'การจำแนกสามเหลี่ยม',
      enterLengthOfSides: 'ป้อนความยาวของด้าน',
      side: 'ด้าน',
      enter: 'ยืนยัน',
      suggestions: 'แนะนำ',
      equilateral: 'ด้านเท่า',
      isosceles: 'หน้าจั่ว',
      right: 'มุมฉาก',
      scalene: 'ด้านไม่เท่า',
      result: 'ผลลัพธ์',
      enterValidTriangleSides: 'ป้อนด้านของสามเหลี่ยมที่ถูกต้อง',
      triangleValidityReminder: 'โปรดจำไว้: ผลรวมของความยาวของด้านสองด้านใดๆ ต้องมากกว่าความยาวของด้านที่เหลือ',
      rightTriangleDescription: 'สามเหลี่ยมมุมฉากคือสามเหลี่ยมที่มีมุมหนึ่งวัดได้ 90 องศา มุมอื่นอีกสองมุมรวมกันได้ 90 องศา',
      equilateralTriangleDescription: 'สามเหลี่ยมที่มีด้านทั้งสามเท่ากันและมีมุมทั้งสาม 60 องศาเท่ากัน ด้านและมุมทั้งหมดเท่ากัน',
      isoscelesTriangleDescription: 'สามเหลี่ยมที่มีด้านสองด้านเท่ากันและมีมุมสองมุมเท่ากัน ด้านสองด้านและมุมตรงข้ามมีความเท่ากัน',
      scaleneTriangleDescription: 'สามเหลี่ยมที่มีด้านสามด้านไม่เท่ากันและมีการวัดมุมสามมุมที่แตกต่างกัน ไม่มีด้านหรือมุมที่เหมือนกัน',
      equilateralResult: 'สามเหลี่ยมด้านเท่า',
      isoscelesResult: 'สามเหลี่ยมหน้าจั่ว',
      rightResult: 'สามเหลี่ยมมุมฉาก',
      scaleneResult: 'สามเหลี่ยมด้านไม่เท่า',
      helpTitle: 'วิธีใช้งานเครื่องคำนวณสามเหลี่ยม',
      step1: 'ขั้นตอนที่ 1: ป้อนด้านของสามเหลี่ยม',
      step1Description: 'ป้อนความยาวของแต่ละด้านของสามเหลี่ยมในช่องป้อนข้อมูลที่เกี่ยวข้อง ค่าทั้งหมดต้องเป็นตัวเลขที่มากกว่าศูนย์',
      step2: 'ขั้นตอนที่ 2: คลิก "ยืนยัน"',
      step2Description: 'หลังจากป้อนด้านทั้งสามแล้ว ให้คลิกปุ่ม "ยืนยัน" เพื่อคำนวณและจำแนกประเภทสามเหลี่ยมของคุณ',
      triangleClassifications: 'การจำแนกประเภทสามเหลี่ยม',
      importantNote: 'หมายเหตุสำคัญ',
      validTriangleNote: 'ด้านที่คุณป้อนต้องสามารถสร้างสามเหลี่ยมที่ถูกต้องได้ นั่นหมายความว่าผลรวมของความยาวของด้านสองด้านใดๆ ต้องมากกว่าความยาวของด้านที่เหลือ',
      errorMessage: 'หากข้อมูลที่ป้อนไม่สามารถสร้างสามเหลี่ยมที่ถูกต้องได้ คุณจะเห็นข้อความแสดงข้อผิดพลาด',
      close: 'ปิด'
    }
  };

  const classifyTriangle = (a: string, b: string, c: string) => {
    const sides = [Number(a), Number(b), Number(c)].sort((x, y) => x - y);
    const [s1, s2, s3] = sides;
    if (s1 <= 0 || s2 <= 0 || s3 <= 0 || s1 + s2 <= s3) return null;
    const isRight = Math.abs(s1 * s1 + s2 * s2 - s3 * s3) < 0.000001;
    if (isRight) return translations[language].rightResult;
    if (s1 === s2 && s2 === s3) return translations[language].equilateralResult;
    if (s1 === s2 || s2 === s3) return translations[language].isoscelesResult;
    return translations[language].scaleneResult;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const classification = classifyTriangle(sides.side1, sides.side2, sides.side3);
    setResult(classification);
  };

  const toggleHelpPopup = () => {
    setShowHelpPopup(!showHelpPopup);
  };

  const applySuggestion = (triangleType) => {
    // Default base value
    const baseValue = 10;
    let newSides = { side1: '', side2: '', side3: '' };
    
    switch (triangleType) {
      case 'equilateral':
        // All sides equal
        newSides = { side1: baseValue, side2: baseValue, side3: baseValue };
        break;
      case 'isosceles':
        // Two sides equal, one different
        newSides = { side1: baseValue, side2: baseValue, side3: Math.round(baseValue * 1.5 * 10) / 10 };
        break;
      case 'right':
        // Pythagorean triple 3-4-5 (scaled)
        newSides = { side1: 3, side2: 4, side3: 5 };
        break;
      case 'scalene':
        // All sides different
        newSides = { side1: 7, side2: 8, side3: 12 };
        break;
      default:
        return;
    }
    
    setSides(newSides);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value.toLowerCase());
  };

  const t = translations[language];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800 p-4 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <div 
          className="bg-white rounded-lg px-2 py-1 md:px-4 md:py-2 flex items-center gap-2 cursor-pointer"
          onClick={toggleHelpPopup}
        >
          <HelpCircle className="w-4 h-4 md:w-6 md:h-6 text-black" />
          <span className="text-black text-sm md:text-lg">{t.howToUse}</span>
        </div>
        <div className="bg-white rounded-lg px-2 py-1 md:px-4 md:py-2 flex items-center gap-2">
          <Globe className="w-4 h-4 md:w-6 md:h-6 text-black" />
          <select 
            className="bg-white text-black text-sm md:text-lg outline-none"
            value={language.charAt(0).toUpperCase() + language.slice(1)}
            onChange={handleLanguageChange}
          >
            <option value="English">English</option>
            <option value="Thai">ภาษาไทย</option>
          </select>
        </div>
      </div>

      {/* Help Popup */}
      {showHelpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{t.helpTitle}</h2>
              <button 
                onClick={toggleHelpPopup}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{t.step1}</h3>
                <p>{t.step1Description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">{t.step2}</h3>
                <p>{t.step2Description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">{t.triangleClassifications}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>{t.equilateral}:</strong> {t.equilateralTriangleDescription}</li>
                  <li><strong>{t.isosceles}:</strong> {t.isoscelesTriangleDescription}</li>
                  <li><strong>{t.scalene}:</strong> {t.scaleneTriangleDescription}</li>
                  <li><strong>{t.right}:</strong> {t.rightTriangleDescription}</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">{t.importantNote}</h3>
                <p>{t.validTriangleNote}</p>
                <p>{t.errorMessage}</p>
              </div>
            </div>
            
            <button 
              onClick={toggleHelpPopup}
              className="mt-6 bg-black text-white px-6 py-2 rounded font-medium hover:bg-gray-800"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
      
      <h1 className="text-3xl md:text-6xl text-white text-center mb-6 underline">
        {t.classifyingTriangle}
      </h1>
      
      <div className="flex flex-col md:flex-row gap-4 mx-2 md:mx-8">
        <div className="flex-1 bg-white rounded-lg flex flex-col items-center p-4 md:p-8 space-y-4">
          <h2 className="text-4xl text-center font-bold mb-8">{t.enterLengthOfSides}</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-12 flex flex-col flex-grow justify-center">
            {[1, 2, 3].map(num => (
              <div key={num} className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-8 w-full">
                <label className="text-xl md:text-2xl min-w-[100px]">{t.side} {num}</label>
                <input
                  id={`side${num}`}
                  type="number"
                  value={sides[`side${num}`]}
                  onChange={(e) => setSides({
                    ...sides,
                    [`side${num}`]: e.target.value
                  })}
                  className="border rounded px-4 py-3 w-full text-xl"
                  min="0.1"
                  step="0.1"
                />
              </div>
            ))}
            <div className="flex justify-center">
              <button 
                type="submit"
                className="bg-black text-white px-12 py-3 rounded text-xl min-w-[200px]"
              >
                {t.enter}
              </button>
            </div>
          </form>
          <div className="w-full mt-8">
            <h6 className="font-medium text-2xl mb-4">{t.suggestions}</h6>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => applySuggestion('equilateral')} 
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded"
              >
                {t.equilateral}
              </button>
              <button 
                onClick={() => applySuggestion('isosceles')} 
                className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded"
              >
                {t.isosceles}
              </button>
              <button 
                onClick={() => applySuggestion('right')} 
                className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded"
              >
                {t.right}
              </button>
              <button 
                onClick={() => applySuggestion('scalene')} 
                className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded"
              >
                {t.scalene}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-lg p-4 md:p-8">
          <h2 className="text-4xl text-center font-bold mb-8">{t.result}</h2>
          {result === null ? (
            <div className="flex flex-col items-center justify-center h-[calc(100%-100px)]">
              <div className="text-center">
                <p className="text-2xl font-bold mb-4">{t.enterValidTriangleSides}</p>
                <p className="text-base md:text-lg text-red-600">
                  {t.triangleValidityReminder}
                </p>
              </div>
            </div>
          ) : result === translations[language].rightResult ? (
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
                  {t.rightTriangleDescription}
                </p>
              </div>
            </div>
          ) : result === translations[language].equilateralResult ? (
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
                  {t.equilateralTriangleDescription}
                </p>
              </div>
            </div>
          ) : result === translations[language].isoscelesResult ? (
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
                  {t.isoscelesTriangleDescription}
                </p>
              </div>
            </div>
          ) : (
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
                  {t.scaleneTriangleDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TriangleCalculator;