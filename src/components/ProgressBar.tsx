'use client';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export interface SkillProgressItem {
    label: string;
    value: number;
}

export interface SkillProgressProps {
    skillProgress: SkillProgressItem[];
}

export function ProgressBar({ skillProgress }: Readonly<SkillProgressProps>) {
    return (
        <div className="kyros-progress-card">
            {skillProgress.length > 0 && (
                    <div className="kyros-progress-grid">
                        {skillProgress.map((item, index) => (
                            <div
                                key={item.label}
                                className="kyros-progress-card"
                                data-aos="fade-up"
                                data-aos-delay={200 + index * 80}
                            >
                                <CircularProgressbar
                                    value={item.value}
                                    text={`${item.value}%`}
                                    styles={buildStyles({
                                        textColor: '#ffffff',
                                        pathColor: '#FF575F',
                                        trailColor: 'rgba(255, 255, 255, 0.12)',
                                    })}
                                />
                                <h4>{item.label}</h4>
                            </div>
                        ))}
                    </div>
                )}
            {skillProgress.length === 0 && (
                <p>No skills to display.</p>
            )}
        </div>
    );
}